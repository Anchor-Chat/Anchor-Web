module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/recommended',
		// 'plugin:@intlify/vue-i18n/recommended',
		'@vue/standard',
		'@vue/typescript/recommended'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		indent: ['error', 'tab'],
		'vue/script-indent': ['error', 'tab'],
		'vue/html-indent': ['error', 'tab'],
		semi: ['warn', 'always'],
		'no-tabs': ['off', { allowIndentationTabs: true }],
		'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }]
		// 'vue-i18n/no-dynamic-keys': ['error'],
		// 'vue-i18n/no-unused-keys': ['warn'],
	},
	ignorePatterns: ['webpack.config.js', 'vue.config.js']
};
