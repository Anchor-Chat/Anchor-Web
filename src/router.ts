import Vue from 'vue';
import Router from 'vue-router';
import MessageView from '~/views/MessageView.vue';

Vue.use(Router);

export const options = {
	routes: [
		{
			path: "/channels/:serverId/:channelId",
			component: MessageView
		}
	]
};
export default new Router(options);
