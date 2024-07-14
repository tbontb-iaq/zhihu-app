import home from '~ms/home-rounded'
import person from '~ms/person-add-rounded'
import account from '~ms/account-circle'

import homeOutline from '~ms/home-outline-rounded'
import personOutline from '~ms/person-add-outline-rounded'
import accountOutline from '~ms/account-circle-outline'

import { FunctionalComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const tabs: (RouteRecordRaw & {
	name: string
	icon: FunctionalComponent
	iconFilled: FunctionalComponent
})[] = [
	{
		path: 'home',
		name: '主页',
		icon: homeOutline,
		iconFilled: home,
		component: () => import('./home.vue'),
	},
	{
		path: 'follow',
		name: '关注',
		icon: personOutline,
		iconFilled: person,
		component: () => import('./follow.vue'),
	},
	{
		path: 'me',
		name: '我的',
		icon: accountOutline,
		iconFilled: account,
		component: () => import('./me.vue'),
	},
]

export default tabs
