import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { AnchorAPIBuilder, AnchorAPI, TextChannel } from "@anchor-chat/anchor-api";

interface RootStore {
	login: string;
	password: string;
	api: AnchorAPI;
	state: string;
	activeServer: any,
	activeChannel: TextChannel
}

export default new Vuex.Store<RootStore>({
	state: {
		login: "",
		password: "",
		api: <unknown>null as AnchorAPI,
		state: "LOGIN",
		activeServer: null,
		activeChannel: <unknown>null as TextChannel,
	},
	mutations: {
		SET_LOGIN_INFO(state, data) {
			state.login = data.login;
			state.password = data.password;
			state.api = data.api;

			(<any>window).api = data.api;

			if (sessionStorage) {
				sessionStorage.setItem("login", data.login);
				sessionStorage.setItem("password", data.password);
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
			return new Promise(async (resolve, reject) => {
				let builder = new AnchorAPIBuilder()
					.setCredentials(data.login, data.password)
					.setDirectory(data.login)

				// if (window.ipfs && window.ipfs.enable) {
				// 	let ipfs = await window.ipfs.enable();

				// 	try {
				// 		await ipfs.pubsub.ls();

				// 		builder.setIPFS(ipfs);
				// 	} catch (e) {

				// 	}
				// }

				builder.createAccount().then((api) => {
					context.commit("SET_LOGIN_INFO", {
						login: data.login,
						password: data.password,
						api
					});
					resolve(api);
				});
			})
		},
		login(context, data) {
			return new Promise((resolve, reject) => {
				let builder = new AnchorAPIBuilder()
					.setCredentials(data.login, data.password)
					.setDirectory(data.login)

				builder.login().then((api) => {
					context.commit("SET_LOGIN_INFO", {
						login: data.login,
						password: data.password,
						api
					});
					resolve(api);
				});
			})
		}
	},
});
