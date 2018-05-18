import "bootstrap";
import "materialize-css";
import "jquery";
import "./lib/web3.min.js";

import Vue from "vue";
import "vue-router";

import GuildsScroller from "./components/guilds-scroller/index.vue";

import "./fonts/material-icons/style.css";
import "./fonts/junction/junction.css";
import "./scss/style.scss";

import Utils from "./utils.js";

Vue.component("guilds-scroller", GuildsScroller);
let vue = new Vue({
	el: "#app",
	data: {

	}
});
Vue.config.devtools = true;

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