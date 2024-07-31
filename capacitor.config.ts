/// <reference types="@capacitor/splash-screen" />
import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'io.tbontb.zhihu_app',
  appName: 'Bihu',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    SplashScreen: {
      showSpinner: true,
      launchAutoHide: false,
      splashFullScreen: true,
    },
  },
}

export default config
