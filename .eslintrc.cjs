module.exports = {
	plugins: ['unicorn'],
	extends: ['alloy', 'alloy/typescript'],
	ignorePatterns: ['/dist/', '/node_modules/'],
	parserOptions: {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
	},
	env: {
		browser: true,
	},
	rules: {
		'unicorn/filename-case': ['error', { 'case': 'kebabCase', ignore: [] }],
		'no-param-reassign': 'off',
		'no-console': 'warn',
		'no-alert': 'error',
	},
	root: true,
};
