<template lang="pug">
async-state.me-page(:promise='user.isLogged', #='{ data }')
  template(v-if='data?.value')
    p 已登录
  template(v-else)
    .not-logged
      ms-person-cancel-outline-rounded.icon
      p.text 未登录，去
        router-link(to='/login', custom, #='{ navigate }')
          v-btn(variant='outlined', @pointerup='navigate') 登录
</template>

<script setup lang="ts">
import { useUser } from '@/store/user'

const user = useUser()
</script>

<style scoped lang="scss">
.me-page {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  &:has(.not-logged) {
    align-items: center;
    justify-content: center;
  }

  > .not-logged {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    > .icon {
      font-size: 5em;
    }
    > .text {
      display: flex;
      align-items: center;
      > .v-btn {
        color: $blue;
        margin-left: 0.5em;
      }
    }
  }
}
</style>
