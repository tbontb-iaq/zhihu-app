<template lang="pug">
.draft-page
  v-btn(@pointerdown='snackbar("ttt")') snackbar
</template>

<script setup lang="ts">
import { snackbar } from '@/libraries/v-ui-toolkit'
</script>

<style scoped lang="scss">
.draft-page {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
