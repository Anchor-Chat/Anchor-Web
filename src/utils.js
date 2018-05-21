export default {
	checkConnection() {
		if (!web3.isConnected()) {
			callback(false);
		} else {
			callback(true);
		}
	},

	web3Setup(callback) {
		if (typeof web3 !== "undefined") {
			web3 = new Web3(web3.currentProvider);
		} else {
			if (process.env.NODE_ENV === "development") {
				web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7777"));
			}
		}
		this.checkConnection(callback);
	},

	showDialog(html, onYes, onNo) {
		let body = $("body");
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

};