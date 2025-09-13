import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
		},

		plugins: {
			'simple-import-sort': simpleImportSort,
			import: importPlugin,
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: ['./tsconfig.app.json'],
				},
			},
		},
		rules: {
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^\\u0000'], // Side effects
						['^react$', '^@?\\w'], // Packages
						['^@/', '^'], // Absolute imports
						['^\\./'], // Relative imports
						['^.+\\.(module.css|module.scss)$'], // CSS modules
						['^.+\\.(gif|png|svg|jpg|jpeg)$'], // Media
					],
				},
			],
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			'import/no-unresolved': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': 'error',
		},
	},
]);
