import { FlatCompat } from '@eslint/eslintrc';
import eslintJs from '@eslint/js';
import parserTypeScript from '@typescript-eslint/parser';
import parserAstro from 'astro-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import path from 'path';

// Polyfill __dirname for ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a FlatCompat instance
// You need to specify a baseDirectory, usually __dirname for the config file's location
const compat = new FlatCompat({
  baseDirectory: __dirname,
  // Optional: resolvePlugins and resolveExtends can be helpful if you have complex setups
  // resolvePlugins: true,
  // resolveExtends: true,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  // --- 0. Global Ignores ---
  {
    ignores: ['node_modules/', 'dist/', 'docs/', 'build/', '.astro/', 'coverage/', '*.min.js'],
  },

  // --- 1. ESLint Recommended Rules (for general JS/TS files) ---
  eslintJs.configs.recommended,

  // --- 2. TypeScript Specific Rules ---
  // Use FlatCompat to convert the legacy recommended config to flat config format
  ...compat.extends(
    'plugin:@typescript-eslint/recommended', // Use the legacy string name here
  ),
  {
    files: ['**/*.ts', '**/*.tsx'],
    // Explicitly set the parser and parser options here for clarity and control
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // project: './tsconfig.json', // Uncomment if you use type-aware linting
      },
    },
    rules: {
      // Add custom TypeScript rules here.
      // Example: '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // --- 3. Astro Specific Rules ---
  // Use FlatCompat for Astro as well
  ...compat.extends(
    'plugin:astro/recommended', // Use the legacy string name here
  ),
  {
    files: ['*.astro'],
    languageOptions: {
      parser: parserAstro, // Specific parser for .astro files
      parserOptions: {
        parser: parserTypeScript, // Parser for scripts inside Astro files
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // Custom Astro-specific rules
    },
  },

  // --- 4. JSX A11y Rules ---
  // Use FlatCompat for JSX A11y
  ...compat.extends(
    'plugin:jsx-a11y/recommended', // Use the legacy string name here
  ),
  {
    files: ['**/*.jsx', '**/*.tsx', '*.astro'],
    // No additional languageOptions needed here as it's covered by other configs
    rules: {
      // Any custom overrides for jsx-a11y rules can go here.
    },
  },

  // --- 5. Prettier Integration (MUST be the last configuration) ---
  // eslint-config-prettier already exports a flat config, so no compat needed
  eslintConfigPrettier,

  // --- General Language Options (for all files) ---
  // This block sets up globals and parser for all files unless overridden
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
