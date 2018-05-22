import "bootstrap";
import "materialize-css";
import "jquery";
//import Web3 from "web3";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import GuildsScroller from "./vue/guilds-scroller/index.vue";
import GuildView from "./vue/guild-view/index.vue";

import "file-loader?name=[name].[ext]!./img/og-image.jpg";

import "./scss/style.scss";

import Utils from "./utils.js";

Vue.component("guilds-scroller", GuildsScroller);
Vue.component("guild-view", GuildView);

let router = new VueRouter({
	routes: [
		{ path: "/guild/:guildId", component: GuildView }
	]
});
let vue = new Vue({
	el: "#app",
	router,
	data: {
		guilds: [
			{
				id: 1,
				name: "Translation Guild",
				img: "g_translate"
			},
			{
				id: 20,
				name: "Coding... People!!",
				img: "code"
			}
		],
		friendsOnline: 10
	}
});
Vue.config.devtools = process.env.NODE_ENV === "development";

setInterval(() => {
	if (window.location.hash === "#/") {
		window.location.hash = "#/guild/0";
	}
}, 500);

function main() {
	//Utils.web3Setup((success) => {
	//if (success) {
	//	if (!web3.eth.defaultAccount) web3.eth.defaultAccount = web3.eth.accounts[0];

	$(document).ready(function(){
		$("[data-toggle=\"tooltip\"]").tooltip();   
	});
	$(".guild").hover((e) => {
		$(e.target).tooltip();
	});

	//let IpfsApi = import("ipfs-api");
	//let ipfs = IpfsApi("localhost", 5001);
	//	} else {
	//Utils.showDialog("Please use a Dapp-Enabled browser or launch a local geth node", main);
	//s	}
	//});
}

main();