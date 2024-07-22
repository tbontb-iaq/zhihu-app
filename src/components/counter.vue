<template lang="pug">
.counter
	p {{ name }}: {{ count }}
	v-btn(@pointerdown='count++') count++
</template>

<script setup lang="ts">
withDefaults(defineProps<{ name: string }>(), { name: 'Counter' })

const count = ref(0)
</script>

<style scoped lang="scss">
.counter {
}
</style>
