const path = require("path");

const { DefinePlugin } = require("webpack");

const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "!!pug-loader!src/index.pug",
		}),
		new CleanWebpackPlugin([
			"dist"
		]),
		new VueLoaderPlugin(),
		new FaviconsWebpackPlugin("./src/img/logo.png"),
		new DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
		}),
	],
	resolve: {
		alias: {
			vue: "vue/dist/vue.js",
			contracts: path.resolve("contracts")
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: ["babel-loader"]
			},
			// {
			// 	test: /\.sol$/,
			// 	use: ["web3-loader", "solc-loader"]
			// },
			{
				test: /\.sol$/,
				use: ["truffle-solidity-loader"]
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
			}
		]
	}
};