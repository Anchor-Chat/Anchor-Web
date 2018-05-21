import "bootstrap";
import "materialize-css";
import "jquery";
import Web3 from "web3";

import Vue from "vue";
import "vue-router";

import GuildsScroller from "./vue/guilds-scroller/index.vue";
import ChannelList from "./vue/channel-list/index.vue";

import "file-loader?name=[name].[ext]!./img/og-image.jpg";

import "./scss/style.scss";

import Utils from "./utils.js";

Vue.component("guilds-scroller", GuildsScroller);
Vue.component("channel-list", ChannelList);

let vue = new Vue({
	el: "#app",
	data: {}
});
Vue.config.devtools = process.env.NODE_ENV === "development";

function main() {
	Utils.web3Setup((success) => {
		if (success) {
			if (!web3.eth.defaultAccount) web3.eth.defaultAccount = web3.eth.accounts[0];

			$(document).ready(function(){
				$("[data-toggle=\"tooltip\"]").tooltip();   
			});
			$(".guild").hover((e) => {
				$(e.target).tooltip();
			});

			let IpfsApi = import("ipfs-api");
			let ipfs = IpfsApi("localhost", 5001);
		} else {
			Utils.showDialog("Please use a Dapp-Enabled browser or launch a local geth node", main);
		}
	});
}

main();