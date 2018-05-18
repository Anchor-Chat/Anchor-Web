const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "production",
	devtool: "source-map",
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true // set to true if you want JS source maps
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	]
});

module.exports.module.rules.forEach(e => {
	if (e.test == /\.css$/) {
		e.use = [
			MiniCssExtractPlugin.loader,
			"css-loader"
		];
	} else if (e.test == /\.scss$/) {
		e.use = [
			MiniCssExtractPlugin.loader,
			"css-loader", // translates CSS into CommonJS
			"sass-loader" // compiles Sass to CSS
		];
	}
});