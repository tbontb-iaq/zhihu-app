import { SplashScreen } from '@capacitor/splash-screen'
import { Plugin } from 'vue'
import { Router } from 'vue-router'

export default <Plugin>function (app) {
  SplashScreen.show()

  const router: Router = app.config.globalProperties.$router

  setTimeout(
    () =>
      router.isReady().then(() => {
        SplashScreen.hide()
      }),
    500
  )
}
