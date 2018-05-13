function web3Setup() {
	if (typeof web3 !== "undefined") {
		web3 = new Web3(web3.currentProvider);
	} else {
		// set the provider you want from Web3.providers
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		if (!web3.isConnected()) {
			web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7777"));
		}
	}
	checkConnection();
}

function checkConnection() {
	if (!web3.isConnected()) {
		showDialog("Please use a Dapp-Enabled browser or launch a local geth node", web3Setup);
	} else {
		if (!web3.eth.defaultAccount) web3.eth.defaultAccount = web3.eth.accounts[0];
		main();
	}
}

let body = $("body");

function showDialog(html, onYes, onNo) {
	let dialog = $("<div id=\"dialog\"></div>");
	let content = $("<p></p>").html(html);
	let fog = $("<div id=\"fog\"></div>");

	if (onYes && !onNo) {
		let ok = $("<button></button>")
			.text("Ok")
			.attr("id", "OK")
			.addClass("button waves-effect waves-light btn");

		ok.click(() => {
			dialog.remove();
			fog.remove();
			onYes();
		});

		dialog.append(ok);
	} else if (onYes && onNo) {

		let yes = $("<button></button>")
			.text("Yes")
			.attr("id", "Yes")
			.addClass("button waves-effect waves-light btn");

		yes.click(() => {
			dialog.remove();
			fog.remove();
			onYes();
		});
		
		dialog.append(yes);

		let no = $("<button></button>")
			.text("No")
			.attr("id", "No")
			.addClass("button waves-effect waves-light btn");

		no.click(() => {
			dialog.remove();
			fog.remove();
			onNo();
		});

		dialog.append(no);
	}

	body.prepend(fog);
	dialog.prepend(content);
	body.append(dialog);
}

let ipfs = IpfsApi("localhost", 5001);

let storage;
let decentracord;

web3Setup();

function main() {
	// storage = Storage(web3);
	// console.log(storage.getAddress(Decentracord.Hash));
	// decentracord = Decentracord(web3);
	// console.log(decentracord.createServer("lukas2005's Device Mod Apps"));
	showDialog("Hello", () => {
		console.log("Yay");
	});
}