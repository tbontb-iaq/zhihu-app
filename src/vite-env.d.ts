/// <reference types="vite/client" />

declare module '~ms/*' {
	import type { FunctionalComponent, SVGAttributes } from 'vue'

	const component: FunctionalComponent<SVGAttributes>
	export default component
}
