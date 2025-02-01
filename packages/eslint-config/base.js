import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import pluginTurbo from "eslint-plugin-turbo";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  pluginTurbo.configs["flat/recommended"],
  {
    languageOptions: {
      parserOptions: {
        projectService: true, // find the tsconfig.json nearest each source file
      },
    },
  },
  pluginPrettier,
  // customize applied rule set here...
  {
    rules: {
      "@typescript-eslint/no-confusing-void-expression": "off",
    },
  },
);
