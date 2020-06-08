/* eslint-disable @typescript-eslint/no-var-requires */
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
	configureWebpack: {
		output: {
			filename: '[name].[hash].js'
		},
		plugins: [
			new FaviconsWebpackPlugin({
				logo: './src/assets/logo.png',
				outputPath: 'assets/',
				favicons: {
					background: '#424242',
					theme_color: '#6d6d6d' /* eslint-disable-line */
				}
			}),
			new InjectManifest({
				swSrc: './src/serviceWorker/sw.ts'
				// chunks: ['app', 'vendors', 'runtime']
			})
		],
		devServer: {
			allowedHosts: ['.gitpod.io', '.ngrok.io']
		},
		optimization: {
			runtimeChunk: 'single',
			splitChunks: {
				cacheGroups: {
					// serviceWorker: {
					// 	test: 'src/serviceWorker/sw.ts',
					// 	name: 'serviceWorker',
					// 	chunks: 'all',
					// 	filename: 'js/sw.js'
					// },
					// vendor: {
					// 	test: /[\\/]node_modules[\\/]/,
					// 	name: 'vendors',
					// 	chunks: 'all'
					// }
				}
			}
		}
	},
	pluginOptions: {
		i18n: {
			locale: 'en',
			fallbackLocale: 'en',
			localeDir: 'locales',
			enableInSFC: false
		}
	}
};
