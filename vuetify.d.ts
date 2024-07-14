import components from 'vuetify/components'

type Components = typeof components

declare module 'vue' {
	export interface GlobalComponents extends Components {}
}

export {}
