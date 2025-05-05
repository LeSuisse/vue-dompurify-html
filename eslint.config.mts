import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config({
    ignores: ['**/.nuxt/**', '**/.output/**', '**/coverage/**'],
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        eslintConfigPrettier,
        eslintPluginPrettierRecommended,
    ],
    languageOptions: {
        parserOptions: {
            project: './tsconfig.json',
        },
    },
    rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
    },
});
