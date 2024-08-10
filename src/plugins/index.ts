import { Plugin } from 'vue'

import loadFont from './load-font'
import setTimeout from './set-timeout'
import routeAnime from './route-anime'
import splashScreen from './splash-screen'
import restoreScrollPos from './restore-scroll-pos'

export default <Plugin>function (app) {
  app.use(loadFont)
  app.use(setTimeout)
  app.use(routeAnime)
  app.use(splashScreen)
  app.use(
    restoreScrollPos,
    ['#app', '.v-application', '.v-application__wrap'].join('>')
  )
}
