<template lang="pug">
v-card.target-card(v-ripple)
  v-card-item
    v-card-title {{ title }}
    v-card-subtitle(opacity='1')
      v-avatar(:image='author.avatar_url', rounded='lg')
      span.name {{ author.name }}
      span.headline {{ author.headline }}
  v-card-text
    span {{ target.excerpt }}
    v-img(v-if='thumbnails.length === 1', :src='thumbnails[0]', width='35%')
  v-card-actions
    ms-thumb-up-outline-rounded
    span {{ target.voteup_count }}
    ms-comment-outline-rounded
    span {{ target.comment_count }}
</template>

<script setup lang="ts">
import { type Target } from '@/libraries/zhihu'

const { target } = defineProps<{ target: Target }>(),
  title = target.question.title,
  author = target.author,
  thumbnails = target.thumbnails ?? (target.thumbnail ? [target.thumbnail] : [])
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors';

.target-card {
  border-radius: 0;

  > .v-card-item {
    .v-card-title {
      font-size: 1.1rem;
      white-space: wrap;
    }
    .v-card-subtitle {
      > .name {
        margin-inline: 5px;
      }
      > .headline {
        color: $gray-600;
      }
    }
  }
  > .v-card-text {
    display: flex;
    padding-bottom: 0;
  }
  > .v-card-actions {
    min-height: 0;
    padding-inline: 1rem;
    align-items: flex-start;

    > * {
      line-height: 1;
      margin-right: 5px;
      // outline: 1px black solid;
    }
  }
}
</style>
