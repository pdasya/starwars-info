module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "react-compiler"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: ["./tsconfig.app.json", "./tsconfig.node.json"],
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-param-reassign": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "no-nested-ternary": "off",
    "react-compiler/react-compiler": "error",
    "react/jsx-props-no-spreading": "off",
    "no-debugger": "warn",
    "react/require-default-props": "off",
  },
};
