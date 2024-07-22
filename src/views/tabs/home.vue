<template lang="pug">
ion-page.home-page
  ion-header
    ion-toolbar
      ion-title {{ name }}

  ion-content(:fullscreen='true')
    v-icon(:icon='tab.icon')
    p {{ name }}
    v-btn(@pointerdown='getData') request
</template>

<script setup lang="ts">
import { z, zApi } from '@/libraries/zhihu'
import tabs from './tabs'

const route = useRoute(),
  tab = tabs.find(t => route.path.match(/\w+$/)?.[0] === t.path)!,
  name = tab.name

const getData = async () => {
  z.get(zApi.recommend)
}
</script>

<style scoped lang="scss">
.home-page {
  > ion-content {
    &::part(scroll) {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }

    > i {
      font-size: 80px;
    }
  }
}
</style>
