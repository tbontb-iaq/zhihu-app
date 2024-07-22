<template lang="pug">
ion-page.me-page
  ion-header
    ion-toolbar
      ion-title {{ name }}

  ion-content(:fullscreen='true')
    v-icon(:icon='tab.icon')
    p {{ name }}
</template>

<script setup lang="ts">
import tabs from './tabs'

const route = useRoute(),
  tab = tabs.find(t => route.path.match(/\w+$/)?.[0] === t.path)!,
  name = tab.name
</script>

<style scoped lang="scss">
.me-page {
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
