import { Plugin } from 'vue'

import loadFont from './load-font'
import setTimeout from './set-timeout'

export default <Plugin>function (app) {
  app.use(loadFont)
  app.use(setTimeout)
}
