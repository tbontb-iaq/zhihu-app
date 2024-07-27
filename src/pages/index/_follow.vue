<template lang="pug">
.follow-page
  p.title {{ name }}
  .content
    v-icon(:icon='icon')
    p {{ name }}
</template>

<script setup lang="ts">
import { type FunctionalComponent } from 'vue'

defineProps<{ name: string; icon: FunctionalComponent }>()
</script>

<style scoped lang="scss">
.follow-page {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  > .title {
    font-size: 20px;
    padding: 13px 20px;
    box-shadow: 0 0 10px black;
  }
  > .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    > i {
      font-size: 100px;
    }
  }
}
</style>
