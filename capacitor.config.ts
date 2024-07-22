import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
	appId: 'io.tbontb.zhihu_app',
	appName: 'Bihu',
	webDir: 'dist',
	plugins: {
		CapacitorHttp: {
			enabled: true,
		},
	},
}

export default config
