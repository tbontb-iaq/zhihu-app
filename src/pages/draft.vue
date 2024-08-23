<template lang="pug">
.draft-page
  async-state.async-state(
    :promise='promise',
    :transition='{ tag: "div" }',
    #='{ data }'
  )
    p {{ data }}
  async-state.async-state(
    :promise='promise',
    :transition='{ tag: "div" }',
    #='{ data }'
  )
    p {{ data }}
</template>

<script setup lang="ts">
import random from '@/utils/random'
import { sleep } from '@/utils/sleep'

const promise = async () => {
  await sleep(2 * 1000)
  return random.num(0, 100)
}
</script>

<style scoped lang="scss">
.draft-page {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  > .async-state {
    width: 100px;
    aspect-ratio: 0.8;
    outline: 1px black solid;
    &:last-child {
      width: 400px;
    }
    > p {
      width: 100%;
      height: 100%;
      outline: 1px black solid;
    }
  }
}
</style>
