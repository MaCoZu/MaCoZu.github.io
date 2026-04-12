export default [
  {
    ignores: ['docs/**', 'dist/**', 'node_modules/**', '**/*.astro', '**/*.tsx', '**/*.jsx']
  },
  {
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': 'warn'
    }
  }
]