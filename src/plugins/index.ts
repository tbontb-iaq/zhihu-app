import { Plugin } from 'vue'

import setTimeout from './set-timeout'

export default <Plugin>function (app) {
	app.use(setTimeout)
}
