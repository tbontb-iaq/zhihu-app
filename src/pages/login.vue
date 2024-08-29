<template lang="pug">
.login-page
  p.title 登录
  main
    p 使用 Cookie 登录
      v-tooltip(location='bottom')
        template(#activator='{ props }')
          v-btn(
            v-bind='props',
            :icon='question',
            variant='outlined',
            @pointerup='props.onMouseenter'
          )
        p(:class='$style["cookie-tooltip"]') 请在 PC 端登录知乎，复制 Cookie 中的
          code z_c0
          | 字段
          br
          | 位置：
          span 右键
          span 检查
          span 应用
          span 储存
          span Cookie
    v-textarea(v-model='cookie', placeholder='z_c0')
    v-btn.submit 确认
</template>

<script setup lang="ts">
import question from '~ms/question-mark-rounded'

const cookie = ref('')
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  flex-direction: column;

  > .title {
    font-size: 20px;
    padding: 13px 20px;
    box-shadow: 0 0 10px black;
  }
  > main {
    margin: 1em;
    display: flex;
    flex-direction: column;
    > p {
      display: flex;
      align-items: center;
      margin-block: 0.5em;
      > .v-btn {
        width: fit-content;
        height: fit-content;
        margin-left: 0.5em;
      }
    }
    > .submit {
      align-self: flex-end;
    }
  }
}
</style>

<style module lang="scss">
.cookie-tooltip {
  > code {
    border-radius: 0.1em;
    margin: 0.2em;
    padding: 0.2em;
    background: $grey;
  }
  > span {
    &:not(:last-of-type):after {
      content: '>';
      margin-inline: 0.5em;
    }
  }
}
</style>
