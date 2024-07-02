import mochaPlugin from 'eslint-plugin-mocha';
import unusedImports from 'eslint-plugin-unused-imports';
import js from "@eslint/js"

export default [
  {
    // All eslint plugins config is here
    languageOptions: {
      ecmaVersion: 2018,
    },
    plugins: { 
      imports: unusedImports,
      mocha: mochaPlugin
    },
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
    rules: {
      "imports/no-unused-imports": "error",
      "mocha/no-exclusive-tests": "error"
    },
  },
  {
    // Default eslint config is here
    languageOptions: {
      ecmaVersion: 2018,
    },
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
    rules: {
      "indent": 0,
      "object-curly-spacing": ["error", "never"],
      "array-bracket-spacing": ["error", "never"],
      "comma-dangle": ["error", "never"],
      "no-use-before-define": ["error", {"functions": false}],
      "arrow-parens": ["error", "always"],
      "func-names": ["error", "as-needed"],
      "max-len": ["error", {"code": 120, "ignoreComments": true}],
      "mocha/no-exclusive-tests": "error",
      "no-underscore-dangle": 0,
    },
  },
]
