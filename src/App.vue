<template lang="pug">
v-app
  router-view(v-slot='{ Component, route }')
    template(v-if='Component')
      transition(:name='route.meta.transition_name')
        keep-alive
          component(:is='Component', :key='route.path')
teleport(to='body') 
  VUIToolkit
</template>

<script setup lang="ts">
import { VUIToolkit } from '@/libraries/v-ui-toolkit'
</script>
