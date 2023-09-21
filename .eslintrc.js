module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true
	},
	extends: 'eslint:recommended',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': 'warn',
		'no-var': 'error'
	}
};
