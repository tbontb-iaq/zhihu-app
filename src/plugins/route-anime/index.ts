import './index.scss'

import { Plugin } from 'vue'
import { isNavigationFailure, Router } from 'vue-router'

export default <Plugin>function (app) {
  const router: Router = app.config.globalProperties.$router

  router.afterEach((to, from, failure) => {
    if (!isNavigationFailure(failure)) {
      const { back } = router.options.history.state

      from.meta.transition_name = to.meta.transition_name =
        back === from.path ? 'slide-left' : 'slide-right'
    }
  })
}
