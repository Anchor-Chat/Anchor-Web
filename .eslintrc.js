module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/recommended',
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
		'no-tabs': ['warn', { allowIndentationTabs: true }]
	},
	ignorePatterns: ['webpack.config.js', 'vue.config.js']
};
