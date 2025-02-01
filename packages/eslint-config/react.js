import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintReact from "@eslint-react/eslint-plugin";
import baseConfig from "./base.js";
import globals from "globals";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [baseConfig, eslintReact.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020, // NB: keep in sync with packages/typescript-config/react.json
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
);
