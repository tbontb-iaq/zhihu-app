<template lang="pug">
v-row.author-card
  v-img(:src='author.avatar_url', height='3em', aspect-ratio='1/1')
  v-col.info(flex='1')
    p.name {{ author.name }}
    p.headline {{ author.headline }}
  v-btn(variant='tonal') 关注
</template>

<script setup lang="ts">
import { type Author } from '@/libraries/zhihu'

const { author } = defineProps<{ author: Author }>()
</script>

<style scoped lang="scss">
@import '@styles/colors';

.author-card {
  margin: 0.5em 0;
  flex-wrap: nowrap;
  align-items: center;
  > .v-img {
    flex: none;
    width: 3em;
    aspect-ratio: 1;
    border-radius: 25%;
  }
  > .info {
    padding: 0;
    min-width: 0;
    margin: 0 0.5em;
    > p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &.headline {
        color: $grey-d1;
        font-size: 0.8em;
      }
    }
  }
  > .v-btn {
    color: $blue-d1;
  }
}
</style>
