<template lang="pug">
.question-page
  .question
    p.title {{ data.question.title }}
    p.count
      span {{ data.question.answer_count }} 回答
      span {{ data.question.follower_count }} 关注
      span {{ data.question.comment_count }} 评论
  author-card(:author='data.author')
  target-content(:content='data.content')
</template>

<script setup lang="ts">
const { data } = useData()

console.log(data)
</script>

<script lang="ts">
import { z, zApi } from '@/libraries/zhihu'
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'

export const useData = defineBasicLoader(
  '/question/[q_id]/answer/[a_id]',
  async ({ params: { a_id: id } }) =>
    z.get(
      zApi.answer,
      { id },
      {
        include: [
          'content',
          'question.answer_count',
          'comment_count',
          'follower_count',
        ],
      }
    )
)
</script>

<style scoped lang="scss">
.question-page {
  padding: 0.75em;

  > .question {
    > .title {
      user-select: text;
    }
    > .count {
      > span {
        vertical-align: middle;
        &:not(:last-of-type) {
          &::after {
            content: '';
            width: 0.3em;
            aspect-ratio: 1;
            background: black;
            border-radius: 100%;
            display: inline-block;
            margin-inline: 0.5em;
          }
        }
      }
    }
  }
}
</style>
