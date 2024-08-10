<template lang="pug">
v-app
  router-view(v-slot='{ Component, route }')
    template(v-if='Component')
      transition(:name='route.meta.transition_name')
        keep-alive
          component(:is='Component', :key='route.path')
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
@use '@styles/settings.scss';
@use 'vuetify';

/* Core CSS required for Ionic components to work properly */
@import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
@import '@ionic/vue/css/normalize.css';
@import '@ionic/vue/css/structure.css';
@import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
@import '@ionic/vue/css/padding.css';
@import '@ionic/vue/css/float-elements.css';
@import '@ionic/vue/css/text-alignment.css';
@import '@ionic/vue/css/text-transformation.css';
@import '@ionic/vue/css/flex-utils.css';
@import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

// @import '@ionic/vue/css/palettes/dark.always.css';
// @import '@ionic/vue/css/palettes/dark.system.css';
@import '@ionic/vue/css/palettes/dark.class.css';

@import '@styles/global.scss';
</style>
