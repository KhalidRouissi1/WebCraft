import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config} */
export default {
  extends: [
    js.configs.recommended,
    {
      ...reactPlugin.configs.flat.recommended,
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    reactPlugin.configs.flat['jsx-runtime'],
    prettier,
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        globals: { ...globals.browser, ...globals.node },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        'react/no-unescaped-entities': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
};
