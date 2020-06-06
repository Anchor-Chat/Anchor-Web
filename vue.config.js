const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
	configureWebpack: {
		plugins: [
			new FaviconsWebpackPlugin({
				logo: './src/assets/logo.png'
			})
		],
		devServer: {
			allowedHosts: ['.gitpod.io']
		}
	}
};
