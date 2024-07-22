import { Plugin } from 'vue'

const originSetTimeout = globalThis.setTimeout

export default <Plugin>function () {
  globalThis.setTimeout = function (handler, timeout = 0, ...args) {
    return originSetTimeout.call(this, handler, Math.max(timeout, 4), ...args)
  }
}

export { originSetTimeout }
