import "bootstrap";
import "materialize-css";
import "jquery";
const Web3 = require("web3");

import Vue from "vue";
import "vue-router";

import GuildsScroller from "./components/guilds-scroller/index.vue";

import Storage from "contracts/Storage.sol";

import "./fonts/material-icons/style.css";
import "./fonts/junction/junction.css";
import "./scss/style.scss";

import Utils from "./utils.js";

let vue = new Vue({
	el: "#app",
	data: {}
});
Vue.config.devtools = true;

Vue.component("guilds-scroller", GuildsScroller);

$(window).on("load", () => {                    
	// Supports Metamask and Mist, and other wallets that provide 'web3'.      
	if (typeof web3 !== "undefined") {                            
		// Use the Mist/wallet provider.                            
		window.web3 = new Web3(web3.currentProvider);               
	} else {                                                      
		// No web3 detected. Show an error to the user or use Infura: https://infura.io/ or connect to Ganache
		if (process.env.NODE_ENV == "development") {
			web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7777"));
		} else {
			Utils.showDialog("Please use a Dapp-Enabled browser", main);
		}
	}

	Storage.setProvider(window.web3.currentProvider);
	main();
});     

function main() {
	$(document).ready(function(){
		$("[data-toggle=\"tooltip\"]").tooltip();   
	});
	$(".guild").hover((e) => {
		$(e.target).tooltip();
	});

	//let IpfsApi = import("ipfs-api");
	let ipfs = IpfsApi("localhost", 5001);
}