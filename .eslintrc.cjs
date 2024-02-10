module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard-with-typescript'],
  ignorePatterns: ['tailwind.config.js', 'postcss.config.js', 'vite.config.ts'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      excludedFiles: ['.eslintrc.cjs'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off'
  }
}