<template lang="pug">
.target-content
</template>

<script setup lang="ts">
const root = useCurrentElement<HTMLDivElement>(),
  props = defineProps<{ content: string }>(),
  { body } = parser.parseFromString(props.content, 'text/html')

body
  .querySelectorAll<HTMLAnchorElement>(
    'a[href^="https://link.zhihu.com/?target="]'
  )
  .forEach(a => {
    const url = new URL(a.href)
    a.href = url.searchParams.get('target') ?? a.href
  })

body.querySelectorAll('figure').forEach(f => {
  f.querySelectorAll<HTMLImageElement>(
    'img[src^="data:image/svg+xml"]'
  ).forEach(img => {
    img.src =
      img.dataset.original ??
      img.dataset.actualsrc ??
      img.dataset['default-watermark-src'] ??
      img.src
  })
})

onMounted(() => {
  root.value.append(...Array.from(body.children))
})
</script>

<script lang="ts">
const parser = new DOMParser()
</script>

<style lang="scss">
@import '@styles/colors';

.target-content {
  user-select: text;

  a {
    text-decoration: none;
    background: linear-gradient(
      to bottom,
      transparent 0 87.5%,
      rgba($blue-a4, 0.5) 0%
    );
  }

  > p {
    margin: 1em 0;

    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
