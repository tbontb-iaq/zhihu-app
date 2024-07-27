<template lang="pug">
.home-page(ref='page')
  p.title {{ name }}

  v-infinite-scroll(:items, @load='load')
    //- v-virtual-scroll(v-slot='{ item }', :items)
    template(v-for='item of items', :key='item.id')
      target-card(:target='item')
      v-divider
</template>

<script setup lang="ts">
import { updateOffset } from './index.vue'
import { type Target, z, zApi } from '@/libraries/zhihu'

import { pairwise } from 'rxjs'
import { fromEvent, useSubscription } from '@vueuse/rxjs'
import { type FunctionalComponent, type GlobalComponents } from 'vue'

type OnLoad = InstanceType<GlobalComponents['VInfiniteScroll']>['onLoad']

defineProps<{ name: string; icon: FunctionalComponent }>()

let count = 0
const offset = ref(0),
  items = ref<Target[]>([]),
  page = ref<HTMLDivElement>(),
  updateNavOffset: (n: number) => void = inject(updateOffset)!,
  load: OnLoad = async ({ done }) => {
    const recommend = await z.get(zApi.recommend)
    items.value.push(...recommend.data.map(d => d.target))

    if (count++ || recommend.paging.is_end) done('empty')
    else done('ok')
  }

onMounted(() => {
  if (page.value === undefined) throw new Error('Page is undefined')

  useSubscription(
    fromEvent(page.value, 'scroll')
      .pipe(
        map(e => (e.target as HTMLDivElement).scrollTop),
        pairwise(),
        map(([a, b]) => b - a),
        debounceTime(10)
      )
      .subscribe(n => {
        updateNavOffset(n)
        offset.value = Math.max(0, Math.min(56 + 10, offset.value + n))
      })
  )
})
</script>

<style scoped lang="scss">
.home-page {
  height: 100%;
  overflow-y: auto;
  > .title {
    z-index: 1;
    position: sticky;
    font-size: 1.25rem;
    padding: 13px 20px;
    background: white;
    box-shadow: 0 0 10px black;
    top: calc(v-bind(offset) * -1px);
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
}
</style>
