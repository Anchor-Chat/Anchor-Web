let express = require("express");
let path = require("path");
let static = require("express-pug-static");

let app = express();

let html_path = path.join(__dirname, "src");

app.use(static({
	baseDir: html_path,
	baseUrl: "/",
	maxAge: 86400,
	pug: { pretty: true }
}));
app.use(express.static(html_path));

app.listen(8000, () => {
	console.log("Listening!");
});