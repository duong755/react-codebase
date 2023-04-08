module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    React: "writable",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": ["./tsconfig.json"],
    "ecmaFeatures": {
      jsx: true,
    },
    "ecmaVersion": 2021,
    "sourceType": "module",
    "import/resolver": {
      typescript: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  plugins: [
    "react", //
    "@typescript-eslint",
    "prettier",
    "import",
    "react-hooks",
    "@emotion",
  ],
  settings: {
    "react": {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    "no-var": ["error"],
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        ignoredNodes: ["TemplateLiteral"],
        SwitchCase: 1,
      },
    ],
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/prefer-nullish-coalescing": [
      "warn",
      {
        ignoreConditionalTests: true,
        ignoreMixedLogicalExpressions: true,
      },
    ],
    "@typescript-eslint/prefer-optional-chain": ["warn"],
    "@typescript-eslint/comma-dangle": [
      2,
      {
        arrays: "only-multiline",
        objects: "only-multiline",
        imports: "only-multiline",
        exports: "only-multiline",
        functions: "never",
        enums: "only-multiline",
        generics: "never",
        tuples: "never",
      },
    ],
    "@typescript-eslint/no-explicit-any": ["warn"],
    "@typescript-eslint/indent": ["off"],
    "@typescript-eslint/quotes": ["off"],
    "prettier/prettier": [
      "error",
      {},
      {
        usePretierrc: true,
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
    "react/no-unknown-property": [
      "warn",
      {
        "ignore": ["css"],
      },
    ],
    "@emotion/pkg-renaming": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always-and-inside-groups",
      },
    ],
    "import/no-unresolved": "error",
    "import/no-named-as-default-member": "off",
  },
  ignorePatterns: [
    "node_modules/",
    "build/",
    "public/",
    "cloud/",
    "coverage/",
    ".vscode/",
    ".webpack/",
    ".eslintrc.cjs",
    ".prettierc.cjs",
    "*.config.cjs",
    ".yarn",
  ],
  overrides: [
    {
      files: ["*.d.ts"],
      rules: {
        "@typescript-eslint/triple-slash-reference": ["off"],
      },
    },
    {
      files: ["tests/**", "**/*.{spec,test}.{ts,tsx,js,jsx}"],
      plugins: ["jest", "testing-library"],
      extends: [
        "plugin:jest/recommended",
        "plugin:testing-library/react",
      ],
    },
  ],
};
