const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new VueLoaderPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
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
				test: /\.(scss)$/,
				use: [{
					loader: "style-loader", // inject CSS to page
				},
				{
					loader: "css-loader", // translates CSS into CommonJS modules
				}, 
				{
					loader: "postcss-loader", // Run post css actions
					options: {
						plugins: function () { // post css plugins, can be exported to postcss.config.js
							return [
								require("precss"),
								require("autoprefixer")
							];
						}
					}
				},
				{
					loader: "sass-loader" // compiles Sass to CSS
				}]
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: (file) => {
								let arr = file.split(path.sep);
								let i = arr.indexOf("src", 0);
								arr = arr.slice(i+1, arr.length-2);
								let filePath = "";
								arr.forEach(e => {
									filePath += e + path.sep;
								});
								return filePath+"[name].html";
							}
						}
					},
					{
						loader: "pug-html-loader",
						options: {
							pretty: true,
							exports: false
						}
					}
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