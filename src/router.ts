import Vue from 'vue';
import Router from 'vue-router';
import MessageView from '~/views/MessageView.vue';
import UserspaceView from '~/views/UserspaceView.vue';
import LoginView from '~/views/LoginView.vue';
import DMList from "~/components/DMList.vue";
import ChannelList from "~/components/ChannelList.vue";

Vue.use(Router);

export const options = {
	routes: [
		{
			path: "/",
			redirect: "/login"
		},
		{
			path: "/@me",
			redirect: "/@me/default"
		},
		{
			path: "/channels/:serverId",
			component: UserspaceView,
			children: [
				{
					path: ":channelId",
					components: {
						default: MessageView,
						"list-sidebar": ChannelList
					}
				}
			]
		},
		{
			path: "/@me",
			component: UserspaceView,
			children: [
				{
					path: ":channel",
					components: {
						default: MessageView,
						"list-sidebar": DMList
					}
				},
				{
					path: "/",
					components: {
						default: <any>null,
						"list-sidebar": DMList
					}
				}
			]
		},
		{
			path: "/login",
			component: LoginView
		}
	]
};
export default new Router(options);
