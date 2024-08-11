<template lang="pug">
.index-page(ref='page')
  v-lazy.tabs(v-for='t of tabs', :key='t.name', :options='{ threshold: 0.3 }')
    component(:is='t.component', :name='t.name', :icon='t.icon')

  v-bottom-navigation(
    grow,
    mandatory,
    :class='{ hide }',
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
  hide = ref(false),
  page = ref<HTMLDivElement>(),
  { x } = useScroll(page, { behavior: 'smooth' }),
  tab = computed(() => Math.round(x.value / innerWidth))

function updateScrollX(n: number) {
  x.value = n * innerWidth
}

provide(ToggleNavbarKey, (force?: boolean) => {
  if (force !== undefined) hide.value = force
  else hide.value = !hide.value
})
</script>

<script lang="ts">
export const ToggleNavbarKey = Symbol('toggle-navbar')
</script>

<style scoped lang="scss">
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
    position: relative;
    scroll-snap-stop: always;
    scroll-snap-align: center;
  }

  > .v-bottom-navigation {
    transition: 0.8s ease;
    box-shadow: 0 0 0.25em black;
    transition-property: translate, box-shadow;

    &.hide {
      box-shadow: none;
      translate: 0 56px;
    }

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
        color: $blue;
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
</style>
