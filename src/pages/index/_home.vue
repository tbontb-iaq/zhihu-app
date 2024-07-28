<template lang="pug">
.home-page(ref='page')
  p.title(:class='{ hide }') {{ name }}

  v-infinite-scroll(:items='feeds.items', @load='feeds.load')
    template(v-for='item of feeds.items', :key='item.id')
      target-card(:target='item')
      v-divider
    template(#empty)
      p 没有更多了
  v-fab(
    app,
    :loading,
    size='x-large',
    :icon='refreshIcon',
    :class='{ hide }',
    color='light-blue-accent-3',
    @pointerdown='refresh'
  )
</template>

<script setup lang="ts">
import refreshIcon from '~ms/refresh-rounded'
import { ToggleNavbarKey } from './index.vue'
import { useSubscription, from } from '@vueuse/rxjs'

defineProps<{ name: string }>()

const offset = 2,
  hide = ref(false),
  feeds = useFeeds(),
  loading = ref(false),
  page = ref<HTMLDivElement>(),
  toggleNavbar: (force?: boolean) => void = inject(ToggleNavbarKey)!,
  { y } = useScroll(page, {
    behavior: 'smooth',
    eventListenerOptions: { passive: true },
  }),
  refresh = async () => {
    loading.value = true
    await feeds.refresh()
    loading.value = false
    y.value = 0
  }

useSubscription(
  from(y)
    .pipe(
      pairwise(),
      map(([a, b]) => b - a)
    )
    .subscribe(n => {
      if (n > offset) {
        hide.value = true
        toggleNavbar(true)
      } else if (n < -offset) {
        hide.value = false
        toggleNavbar(false)
      }
    })
)
</script>

<script lang="ts">
import { pairwise } from 'rxjs'
import localforage from 'localforage'
import { type GlobalComponents } from 'vue'

import { type Target, z, zApi } from '@/libraries/zhihu'

type OnLoad = NonNullable<
  InstanceType<GlobalComponents['VInfiniteScroll']>['onLoad']
>

const KEY = 'home-feeds',
  useFeeds = defineStore(KEY, () => {
    const items = ref<Target[]>([]),
      load = ref<OnLoad>(async ({ done, side }) => {
        load.value = async ({ done }) => {
          if (items.value.length > 20) {
            done('empty')
            return
          }

          const recommend = await z.get(zApi.recommend)
          items.value.push(...recommend.data.map(d => d.target))

          if (recommend.paging.is_end) done('empty')
          else done('ok')
        }

        const saved = await localforage.getItem<Target[]>(KEY)
        if (saved) {
          items.value.push(...saved)
          done('ok')
        } else await load.value({ done, side })
      })

    async function refresh() {
      const recommend = await z.get(zApi.recommend)
      items.value.splice(
        0,
        items.value.length,
        ...recommend.data.map(d => d.target)
      )
    }

    watch(items.value, async value => {
      await localforage.setItem(KEY, toRaw(value))
    })

    return { items, load, refresh }
  })
</script>

<style scoped lang="scss">
.home-page {
  height: 100%;
  overflow-y: auto;

  $hide-time: 0.8s;

  > .title {
    top: 0;
    z-index: 1;
    position: sticky;
    font-size: 1.25rem;
    padding: 13px 20px;
    background: white;
    transition: $hide-time ease;
    box-shadow: 0 0 10px black;
    transition-property: top box-shadow;

    &.hide {
      top: -56px;
      box-shadow: none;
    }
  }
  > .v-infinite-scroll {
    > :deep(.v-infinite-scroll__side:first-child) {
      padding: 0;
    }
    > .target-card {
      flex-shrink: 0;
    }
    > .v-divider:last-of-type {
      display: none;
    }
  }
  > .v-fab {
    $m: 20px;

    > :deep(.v-fab__container) {
      transition: $hide-time ease;
      transition-property: translate scale;
      margin: calc(56px + $m) $m;

      .v-icon {
        font-size: 3rem;
      }
    }

    &.hide {
      > :deep(.v-fab__container) {
        translate: calc(64px + $m);
      }
    }
  }
}
</style>
