module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ["dist", ".eslintrc.js"],
  parser: "@typescript-eslint/parser",
  plugins: [],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
  },
};
