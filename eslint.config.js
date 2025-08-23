export default [
  {
    files: ["lib/**/*.js", "demo/**/*.js"],
    ignores: [
      "dist/**/*",
      "demo/liquid-glass.js",
      "demo/style.css",
      "node_modules/**/*",
      "coverage/**/*"
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        navigator: "readonly"
      }
    },
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error"
    }
  }
];
