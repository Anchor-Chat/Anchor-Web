import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import MessageView from '~/views/MessageView.vue';
import UserspaceView from '~/views/UserspaceView.vue';
import LoginView from '~/views/LoginView.vue';
import DMList from '~/components/DMList.vue';
import ChannelList from '~/components/ChannelList.vue';

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/@me',
		redirect: '/@me/default'
	},
	{
		path: '/channels/:serverId',
		component: UserspaceView,
		children: [
			{
				path: ':channelId',
				components: {
					default: MessageView,
					'list-sidebar': ChannelList
				}
			}
		]
	},
	{
		path: '/@me',
		component: UserspaceView,
		children: [
			{
				path: ':channel',
				components: {
					default: MessageView,
					'list-sidebar': DMList
				}
			},
			{
				path: '/',
				components: {
					default: null as any,
					'list-sidebar': DMList
				}
			}
		]
	},
	{
		path: '/login',
		component: LoginView
	}
];
export default new VueRouter({ routes });

// import Vue from 'vue';
// import VueRouter, { RouteConfig } from 'vue-router';
// import Home from '../views/Home.vue';

// Vue.use(VueRouter);

// const routes: Array<RouteConfig> = [
// 	{
// 		path: '/',
// 		name: 'Home',
// 		component: Home
// 	},
// 	{
// 		path: '/about',
// 		name: 'About',
// 		// route level code-splitting
// 		// this generates a separate chunk (about.[hash].js) for this route
// 		// which is lazy-loaded when the route is visited.
// 		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// 	}
// ];

// const router = new VueRouter({
// 	routes
// });

// export default router;
