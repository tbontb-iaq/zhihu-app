import random from '@/utils/random'

import { Plugin } from 'vue'
import { isNavigationFailure, Router } from 'vue-router'

// TODO 清理滚动位置 以防内存泄漏

const id_key = 'scroll-save-id',
  saveScrollPos = 'save-scroll-position',
  scrollBehaviorPrefix = 'scroll-behavior-',
  prefixRegex = new RegExp(`${scrollBehaviorPrefix}(\\w+)`),
  scrollPosMap = new Map<string, Map<string, ScrollToOptions>>(),
  idKey = id_key
    .toLowerCase()
    .replaceAll(/-(\w)/g, (_, w: string) => w.toUpperCase())

export default <Plugin<[selectors?: string | string[]]>>(
  function (app, selectors) {
    const router: Router = app.config.globalProperties.$router,
      selector = [
        `.${saveScrollPos}`,
        ...(Array.isArray(selectors) ? selectors : [selectors ?? '']),
      ].join(',')

    router.beforeEach((_, from, next) => {
      if (!scrollPosMap.has(from.path)) scrollPosMap.set(from.path, new Map())
      const map = scrollPosMap.get(from.path)!

      document.querySelectorAll(selector).forEach(el => {
        if (el instanceof HTMLElement) {
          const key = el.dataset[idKey] ?? random.str()
          el.dataset[idKey] = key

          map.set(key, {
            top: el.scrollTop,
            left: el.scrollLeft,
            behavior:
              <ScrollBehavior>el.className.match(prefixRegex)?.[1] ?? undefined,
          })
        }
      })

      next()
    })

    router.afterEach((to, _, failure) => {
      if (!isNavigationFailure(failure)) {
        const map = scrollPosMap.get(to.path)
        map &&
          nextTick().then(() => {
            map.forEach((options, key) => {
              const el = document.querySelector<HTMLElement>(
                `[data-${id_key}="${key}"]`
              )
              el?.scrollTo(options)
            })
          })
      }
    })
  }
)

export { saveScrollPos, scrollBehaviorPrefix }
