module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends:["standard", "standard-jsx", "standard-react"],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true, }

    ],
    'react/prop-types':"off",
    'react/no-unescaped-entities':"off",
    "react/react-in-jsx-scope":'off',
    "react-hooks/exhaustive-deps":'off',
    "operator-linebreak":'off'
    
  },
}
