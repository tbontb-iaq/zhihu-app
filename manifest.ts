import { ManifestOptions } from 'vite-plugin-pwa'

export default <Partial<ManifestOptions>>{
	id: '/',
	name: 'Bihu',
	short_name: 'Bihu',
	orientation: 'any',
	theme_color: '#1772F6',
	background_color: '#ffffff',
	description: '第三方知乎客户端',

	display: 'standalone',
	// display_override: ['window-controls-overlay', 'fullscreen'],

	icons: [
		{
			purpose: 'any',
			sizes: '1000x1000',
			src: '/favicon.svg',
		},
	],
}
