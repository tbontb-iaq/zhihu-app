<template lang="pug">
.home-page(ref='page', :class='saveScrollPos')
  p.title(:class='{ hide }') {{ name }}

  v-infinite-scroll(
    :key='feeds.items?.[0]?.id',
    :items='feeds.items',
    @load='load'
  )
    template(v-for='item of feeds.items', :key='item.id')
      target-card(:target='item')
      v-divider
    template(#empty)
      p.no-more 没有更多了
    template(#loading)
      v-progress-circular.loading(indeterminate, size='98')
    template(#error='{ props }')
      p.error
        | 出错了请
        v-btn(v-bind='props', variant='tonal') 重试
  v-fab(
    size='x-large',
    :class='{ hide }',
    :icon='refreshIcon',
    style='height: auto',
    :loading='feeds.isLoading',
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
  },
  load: OnLoad = async ({ done }) => {
    if (feeds.isLoading)
      watchOnce(
        () => feeds.isLoading,
        () => done('ok')
      )
    else
      try {
        // TODO: 移除此限制
        if (feeds.items.length > 20) {
          done('empty')
          return
        }
        await feeds.load()
        if (feeds.isEnd) done('empty')
        else done('ok')
      } catch (e) {
        done('error')
      }
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
import { type GlobalComponents } from 'vue'

import { type Target, z, zApi } from '@/libraries/zhihu'
import { saveScrollPos } from '@/plugins/restore-scroll-pos'
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'

type OnLoad = NonNullable<
  InstanceType<GlobalComponents['VInfiniteScroll']>['onLoad']
>

const KEY = 'home-feeds',
  useFeeds = defineStore(KEY, () => {
    let index = 0
    const count = 6,
      isLoading = ref(true),
      isEnd = ref(false),
      items = ref<Target[]>([]),
      { data: cache, isFinished } = useIDBKeyval<Target[]>(KEY, [])

    watchOnce(isFinished, v => (isLoading.value = !v))

    async function get() {
      if (isEnd.value) return
      const recommend = await z.get(zApi.recommend)
      cache.value.push(...recommend.data.map(d => d.target))

      if (recommend.paging.is_end) isEnd.value = true
    }

    async function load() {
      isLoading.value = true
      if (index + count > cache.value.length) await get()
      items.value.push(...cache.value.slice(index, index + count))
      index += count
      isLoading.value = false
    }

    async function refresh() {
      isLoading.value = true
      isEnd.value = false
      await get()
      cache.value.splice(0, index)
      index = 0
      items.value = []
      isLoading.value = false
    }

    return { items, isLoading, isEnd, load, refresh }
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
    > :deep(.v-infinite-scroll__side) {
      &:first-child {
        padding: 0;
      }
      &:last-child {
        > .no-more {
          margin: 2em;
        }
        > .loading {
          margin-block: 10em;
        }
        > .error {
          margin-block: 2em;
          > .v-btn {
            margin-inline: 1em;
          }
        }
      }
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
