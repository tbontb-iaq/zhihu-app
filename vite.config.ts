/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

import icons from 'unplugin-icons/vite'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import IconResolver from 'unplugin-icons/resolver'
import { IonicResolver } from 'unplugin-vue-components/resolvers'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({ template: { transformAssetUrls } }),
		legacy(),
		autoImport({
			eslintrc: { enabled: true },
			imports: ['vue', 'vue-router'],
		}),
		components({
			resolvers: [
				IonicResolver(),
				IconResolver({
					prefix: false,
					alias: { ms: 'material-symbols' },
				}),
			],
		}),
		vuetify({
			autoImport: true,
			styles: {
				configFile: 'src/assets/styles/settings.scss',
			},
		}),
		icons(),
	],
	resolve: {
		alias: {
			'~ms': '~icons/material-symbols',
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	test: { globals: true, environment: 'jsdom' },
})
