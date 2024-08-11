<template lang="pug">
v-card.target-card(v-ripple, @pointerup='jump')
  v-card-item
    v-card-title {{ title }}
    v-card-subtitle
      v-avatar(:image='author.avatar_url')
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
  thumbnails =
    target.thumbnails ?? (target.thumbnail ? [target.thumbnail] : []),
  router = useRouter()

function jump() {
  if (target.type === 'answer')
    router.push(`/question/${target.question.id}/answer/${target.id}`)
}
</script>

<style scoped lang="scss">
.target-card {
  border-radius: 0;
  padding: 0.5em 1em;
  > * {
    padding: 0;
  }

  > .v-card-item {
    .v-card-title {
      font-size: 1.1em;
      font-weight: bold;
      white-space: wrap;
    }
    .v-card-subtitle {
      padding: 0;
      opacity: 1;
      display: flex;
      align-items: center;
      margin-block: 0.25em 0.5em;
      > .v-avatar {
        border-radius: 25%;
        --v-avatar-height: 2em;
      }
      > .name {
        margin-inline: 0.5em;
      }
      > .headline {
        color: $grey-d1;
      }
    }
  }
  > .v-card-text {
    display: flex;
    > span {
      max-width: 100%;
    }
  }
  > .v-card-actions {
    min-height: 0;
    margin-top: 0.25em;
    align-items: flex-start;

    > * {
      line-height: 1;
      margin-right: 0.25em;
    }
  }
}
</style>
