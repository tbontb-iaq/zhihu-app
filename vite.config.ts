/// <reference types="vitest" />

import manifest from './manifest'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

import icons from 'unplugin-icons/vite'
import vueRouter from 'unplugin-vue-router/vite'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import IconResolver from 'unplugin-icons/resolver'
import { IonicResolver } from 'unplugin-vue-components/resolvers'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import { VitePWA } from 'vite-plugin-pwa'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import { fileURLToPath } from 'node:url'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vueRouter({ exclude: ['**/_*'] }),
      autoImport({
        vueTemplate: true,
        eslintrc: { enabled: true },
        imports: ['vue', 'pinia', 'rxjs', '@vueuse/core', VueRouterAutoImports],
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
      vue({ template: { transformAssetUrls } }),
      legacy({
        modernPolyfills: true,
        renderLegacyChunks: false,
      }),
      vuetify({
        autoImport: true,
        styles: {
          configFile: './src/assets/styles/settings.scss',
        },
      }),
      icons(),
      mode !== 'production' &&
        VitePWA({
          manifest,
          registerType: 'autoUpdate',
          devOptions: { enabled: true },
        }),
    ],
    resolve: {
      alias: {
        '~ms': '~icons/material-symbols',
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@styles': fileURLToPath(
          new URL('./src/assets/styles', import.meta.url)
        ),
      },
    },
    server: {
      proxy: {
        '/__vite_dev_proxy__': {
          changeOrigin: true,
          cookieDomainRewrite: {
            'zhihu.com': 'localhost',
            '.zhihu.com': 'localhost',
          },
          configure(_, options) {
            options.rewrite = path => {
              const proxyUrl = new URL(path, 'file:'),
                url = new URL(proxyUrl.searchParams.get('url'))
              options.target = url.origin
              return url.pathname + url.search
            }
          },
        },
      },
    },
    test: { globals: true, environment: 'jsdom' },
  }
})
