import { Plugin } from 'vue'

const kitId = 'axh3jsy'

export default <Plugin>function () {
  useScriptTag(`https://use.typekit.net/${kitId}.js`, () => {
    // @ts-expect-error 类型“Window & typeof globalThis”上不存在属性“Typekit”
    window.Typekit.load({ kitId, scriptTimeout: 3000, async: true })
  })
}
