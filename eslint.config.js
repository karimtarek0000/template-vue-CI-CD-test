import js from '@eslint/js'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

// Common files to ignore
const ignores = [
	'node_modules/**',
	'dist/**',
	'public/**',
	'*.config.js',
	'.git/**',
	'coverage/**',
]

export default [
	{ ignores },
	js.configs.recommended,
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				document: 'readonly',
				window: 'readonly',
				console: 'readonly',
				setTimeout: 'readonly',
				clearTimeout: 'readonly',
				IntersectionObserver: 'readonly',
			},
		},
		rules: {
			'no-console': 'error', // This rule disallows console statements
			'no-debugger': 'error',
		},
	},
	{
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				document: 'readonly',
				window: 'readonly',
				console: 'readonly',
				setTimeout: 'readonly',
				clearTimeout: 'readonly',
			},
			parserOptions: {
				parser: 'espree',
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			vue: vuePlugin,
		},
		rules: {
			'no-console': 'error',
			'no-debugger': 'error',
			'vue/multi-word-component-names': 'off',
		},
	},
]
