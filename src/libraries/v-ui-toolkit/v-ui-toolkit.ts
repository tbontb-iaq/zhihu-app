import { Fragment, renderList, VNode } from 'vue'

const vnodeMap = shallowReactive(new Map<string, () => VNode>()),
  VUIToolkit = defineComponent({
    name: 'VUIToolkit',
    setup() {
      return () =>
        h(
          Fragment,
          renderList(vnodeMap, ([key, vnode]) => h(vnode, { key }))
        )
    },
  })

export { VUIToolkit, vnodeMap }
