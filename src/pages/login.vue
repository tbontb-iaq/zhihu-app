<template lang="pug">
.login-page
  async-state(:promise='p')
</template>

<script setup lang="ts">
const p = Promise.resolve(0)
</script>

<style scoped lang="scss">
.login-page {
}
</style>
