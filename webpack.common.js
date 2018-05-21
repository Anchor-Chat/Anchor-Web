const path = require("path");
const fs = require("fs");
const http = require("http");

const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const WebpackOnBuildPlugin = require("./onbuild.js");

let title = "Anchor"
module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new CleanWebpackPlugin([
			"dist"
		]),
		new HtmlWebpackPlugin({
			inject: false,
			template: "!!pug-loader!src/index.pug",
			title: title,
			description: title+" - an app just like discord but living entirely on the IPFS network and the Ethereum blockchain",
			url: "http://example.com"
		}),
		new FaviconsWebpackPlugin("./src/img/logo.png"),
		new VueLoaderPlugin(),
		new WebpackOnBuildPlugin(compilation => {
			http.get("http://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js", (msg) => {
				let pp = path.join(module.exports.output.path, "lib");
				let p = path.parse(pp);
				if (!fs.existsSync(p.dir)) {
					fs.mkdirSync(p.dir);
				}
				if (!fs.existsSync(pp)) {
					fs.mkdirSync(pp);
				}
				msg.pipe(fs.createWriteStream(path.join(pp, "web3.min.js")));
			});
		})
	],
	resolve: {
		alias: {
			vue: "vue/dist/vue.js"
		}
	},
	externals: {
		web3: 'Web3'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]          
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader", // creates style nodes from JS strings
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					"file-loader"
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					"file-loader"
				]
			},
			{
				test: /\.pug$/,
				use: [
					"pug-loader"
				]
			},
			{
				test: /\.vue$/,
				use: [
					"vue-loader"
				]
			},
		]
	}
};