<template lang="pug">
ion-page.tabs-index
	ion-router-outlet

	v-layout
		v-bottom-navigation(v-model='tab', mode='shift', grow, mandatory)
			v-btn(v-for='t of tabs', :key='t.path')
				v-icon(:icon='t.name === route.name ? t.iconFilled : t.icon')
				span {{ t.name }}
</template>

<script setup lang="ts">
import tabs from './tabs'
import { useIonRouter } from '@ionic/vue'

const route = useRoute(),
	router = useIonRouter(),
	tab = ref(0)

watch(tab, () => {
	router.replace(tabs[tab.value].path)
})
</script>

<style scoped lang="scss">
.tabs-index {
	> .v-layout {
		> .v-bottom-navigation {
			box-shadow: 0 0 5px black;

			> .v-bottom-navigation__content {
				> .v-btn {
					> :deep(.v-btn__overlay) {
						background: transparent;
					}
					> .v-btn__content {
						> .v-icon {
							font-size: 30px;
						}
					}
				}
			}
		}
	}
}
</style>
