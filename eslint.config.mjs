import eslintJs from '@eslint/js';
import parserTypeScript from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  // --- 0. Global Ignores ---
  {
    ignores: [
      'node_modules/',
      'dist/',
      'docs/',
      'build/',
      '.astro/',
      'coverage/',
      '*.min.js',
      '**/*.astro', // Exclude all Astro files from ESLint
    ],
  },

  // --- 1. ESLint Recommended Rules (
  eslintJs.configs.recommended,

  // --- 2. TypeScript Specific Rules ---
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },

  // --- 3. JSX/TSX Specific Rules ---
  {
    files: ['**/*.jsx', '**/*.tsx'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // --- 4. Astro Specific Rules ---
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        parser: parserTypeScript,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      // Disable rules that don't work well with Astro
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // --- 5. Prettier Integration (MUST be the last configuration) ---
  eslintConfigPrettier,

  // --- General Language Options (for all files) ---
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.astro'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];

export default config;
