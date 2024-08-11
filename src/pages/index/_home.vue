<template lang="pug">
.home-page(ref='page', :class='saveScrollPos')
  p.title(:class='{ hide }') {{ name }}

  v-infinite-scroll(
    :key='feeds.items?.[0]?.id',
    :items='feeds.items',
    @load='feeds.load'
  )
    template(v-for='item of feeds.items', :key='item.id')
      target-card(:target='item')
      v-divider
    template(#empty)
      p 没有更多了
  v-fab(
    size='x-large',
    :class='{ hide }',
    :icon='refreshIcon',
    style='height: auto',
    :loading='feeds.loading',
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
  page = ref<HTMLDivElement>(),
  toggleNavbar: (force?: boolean) => void = inject(ToggleNavbarKey)!,
  { y } = useScroll(page, {
    behavior: 'smooth',
    eventListenerOptions: { passive: true },
  }),
  refresh = async () => {
    await feeds.refresh()
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
import { saveScrollPos } from '@/plugins/restore-scroll-pos'

type OnLoad = NonNullable<
  InstanceType<GlobalComponents['VInfiniteScroll']>['onLoad']
>

const KEY = 'home-feeds',
  useFeeds = defineStore(KEY, () => {
    let index = 0,
      is_end = false
    const count = 6,
      loading = ref(false),
      items = ref<Target[]>([]),
      cache = ref<Target[]>([]),
      load: OnLoad = async ({ done }) => {
        if (loading.value) watchOnce(loading, () => done('ok'))
        else {
          loading.value = true
          if (index === cache.value.length && items.value.length < 20)
            await get.value()
          if (index === cache.value.length) done('empty')
          else {
            const n = Math.min(count, cache.value.length - index)
            items.value.push(...cache.value.slice(index, index + n))
            index += n
            done('ok')
          }
          loading.value = false
        }
      },
      get = {
        value: async () => {
          get.value = async () => {
            if (is_end) return
            const recommend = await z.get(zApi.recommend)
            cache.value.push(...recommend.data.map(d => d.target))

            if (recommend.paging.is_end) is_end = true
          }

          const saved = await localforage.getItem<Target[]>(KEY)
          if (saved) cache.value.push(...saved)
          else await get.value()
        },
      }

    async function refresh() {
      loading.value = true
      is_end = false
      await get.value()
      cache.value.splice(0, index)
      index = 0
      items.value = []
      loading.value = false
    }

    watchArray(cache, async arr => await localforage.setItem(KEY, toRaw(arr)), {
      deep: true,
    })

    return { items, loading, load, refresh }
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
    padding: 0.65em 1em;
    background: white;
    transition: $hide-time ease;
    box-shadow: 0 0 0.6em black;
    transition-property: top, box-shadow;

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
    }
    > .v-divider:last-of-type {
      display: none;
    }
  }
  > .v-fab {
    $m: 1.5em;
    right: 0;
    bottom: 56px;
    margin: $m;
    position: absolute;
    transition: $hide-time ease;
    transition-property: translate;

    > :deep(.v-fab__container) {
      position: static;

      .v-icon {
        font-size: 3rem;
      }
    }

    &.hide {
      translate: calc(64px + $m);
    }
  }
}
</style>
