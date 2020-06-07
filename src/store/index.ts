import Vue from 'vue';
import Vuex from 'vuex';

import { AnchorAPIBuilder, AnchorAPI, TextChannel } from '@anchor-chat/anchor-api';
// import ipfsClient from 'ipfs-http-client';

Vue.use(Vuex);

interface RootStore {
	login: string;
	password: string;
	api: AnchorAPI;
	state: string;
	activeServer: any;
	activeChannel: TextChannel;
}

const ipfsConfig = {
	config: {
		Addresses: {
			Swarm: [
				// '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
				// '/dns4/stardust.mkg20001.io/tcp/443/wss/p2p-stardust'
				// '/ip6/::/tcp/5892/ws/p2p-stardust'
				// '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star'
				'/ip4/127.0.0.1/tcp/13579/wss/p2p-webrtc-star'
				// '/dns4/higdon.space/tcp/80/ws/p2p-webrtc-star'
				// '/dns4/13579-b7144140-6152-4f25-a78f-fd54f59593ce.ws-eu01.gitpod.io/tcp/443/wss/p2p-webrtc-star/'
			]
		}
	}
};

export default new Vuex.Store<RootStore>({
	state: {
		login: '',
		password: '',
		api: null as unknown as AnchorAPI,
		state: 'LOGIN',
		activeServer: null,
		activeChannel: null as unknown as TextChannel
	},
	mutations: {
		SET_LOGIN_INFO(state, data) {
			state.login = data.login;
			state.password = data.password;
			state.api = data.api;

			(window as any).api = data.api;

			if (sessionStorage) {
				sessionStorage.setItem('login', data.login);
				sessionStorage.setItem('password', data.password);
			}
		},
		CHANGE_STATE(state, newState) {
			state.state = newState;
		},
		ACTIVE_SERVER(state, server) {
			state.activeServer = server;
		},
		ACTIVE_CHANNEL(state, channel) {
			state.activeChannel = channel;
		}
	},
	actions: {
		async createAccount(context, data) {
			return new Promise((resolve, reject) => {
				const builder = new AnchorAPIBuilder()
					.setCredentials(data.login, data.password)
					.setIPFSConfig(ipfsConfig)
					// .setIPFS(ipfsClient({
					// 	host: 'localhost',
					// 	port: 5001,
					// 	protocol: 'http'
					// }))
					.setDirectory(data.login);

				// if (window.ipfs && window.ipfs.enable) {
				// 	let ipfs = await window.ipfs.enable();

				// 	try {
				// 		await ipfs.pubsub.ls();

				// 		builder.setIPFS(ipfs);
				// 	} catch (e) {

				// 	}
				// }

				builder.createAccount().then((api) => {
					context.commit('SET_LOGIN_INFO', {
						login: data.login,
						password: data.password,
						api
					});
					resolve(api);
				});
			});
		},
		login(context, data) {
			return new Promise((resolve, reject) => {
				const builder = new AnchorAPIBuilder()
					.setCredentials(data.login, data.password)
					.setIPFSConfig(ipfsConfig)
					// .setIPFS(ipfsClient({
					// 	host: 'localhost',
					// 	port: 5001,
					// 	protocol: 'http'
					// }))
					.setDirectory(data.login);

				builder.login().then((api) => {
					context.commit('SET_LOGIN_INFO', {
						login: data.login,
						password: data.password,
						api
					});
					resolve(api);
				});
			});
		}
	}
});
