<template lang="pug">
.index-page(ref='page')
  v-lazy.tabs(v-for='t of tabs', :key='t.name', :options='{ threshold: 0.3 }')
    component(:is='t.component', :name='t.name', :icon='t.icon')

  teleport(to='body')
    v-layout
      v-bottom-navigation(
        grow,
        mandatory,
        :model-value='tab',
        @update:model-value='updateScrollX'
      )
        v-btn(v-for='(t,i) of tabs', :key='t.name')
          v-icon(:icon='i === tab ? t.iconFilled : t.icon')
          span {{ t.name }}
</template>

<script setup lang="ts">
import homeFilled from '~ms/home-rounded'
import personFilled from '~ms/person-add-rounded'
import accountFilled from '~ms/account-circle'

import homeOutline from '~ms/home-outline-rounded'
import personOutline from '~ms/person-add-outline-rounded'
import accountOutline from '~ms/account-circle-outline'

const tabs = [
    {
      name: '主页',
      icon: homeOutline,
      iconFilled: homeFilled,
      component: defineAsyncComponent(() => import('./_home.vue')),
    },
    {
      name: '关注',
      icon: personOutline,
      iconFilled: personFilled,
      component: defineAsyncComponent(() => import('./_follow.vue')),
    },
    {
      name: '我的',
      icon: accountOutline,
      iconFilled: accountFilled,
      component: defineAsyncComponent(() => import('./_me.vue')),
    },
  ],
  offset = ref(0),
  page = ref<HTMLDivElement>(),
  { x } = useScroll(page, { behavior: 'smooth' }),
  tab = computed(() => Math.round(x.value / innerWidth))

function updateScrollX(n: number) {
  x.value = n * innerWidth
}

provide(updateOffset, (n: number) => {
  offset.value = Math.max(0, Math.min(56 + 4, offset.value + n))
})
</script>

<script lang="ts">
export const updateOffset = Symbol('update-offset')
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors';

.index-page {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  scroll-snap-type: inline mandatory;

  > .tabs {
    width: 100%;
    height: 100dvh;
    flex-shrink: 0;
    overflow-x: hidden;
    scroll-snap-stop: always;
    scroll-snap-align: center;
  }
}

body {
  > .v-layout {
    > .v-bottom-navigation {
      translate: 0 calc(v-bind(offset) * 1px);
      box-shadow: 0 0 5px black;

      .v-btn {
        transition: all 0.1s ease;

        .v-icon {
          font-size: 30px;
          + span {
            font-size: 0;
            transition: all 0.3s ease;
          }
        }

        &.v-btn--selected {
          color: $blue-500;
          .v-icon + span {
            font-size: 12px;
          }
        }

        > :deep(.v-btn__overlay) {
          background: transparent;
        }
      }
    }
  }
}
</style>
