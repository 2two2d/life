import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import eslintPluginImport from "eslint-plugin-import";
import boundaries from "eslint-plugin-boundaries";
import reactPlugin from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: reactPlugin,
      import: eslintPluginImport,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          prefix: ["I"],
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
          prefix: ["I"],
        },
      ],
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@/*/*/*/*"],
        },
      ],
      "react/jsx-boolean-value": ["error", "never"],
      "max-params": ["error", 3],
      "no-magic-numbers": [
        "warn",
        {
          ignore: [-1, 0, 1],
        },
      ],
      "no-new-func": "error",
      "no-return-await": "warn",
      "react/jsx-key": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        {
          props: "never",
          children: "never",
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "sibling",
            "parent",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "@/app/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "**/interface/**",
              group: "type",
              position: "before",
            },
            {
              pattern: "**/enum/**",
              group: "type",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: [
            "builtin",
            "external",
            "internal",
            "object",
            "type",
          ],
          "newlines-between": "always-and-inside-groups",
        },
      ],
      "import/newline-after-import": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      import: importPlugin,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    ...boundaries.configs.recommended,
    plugins: {
      boundaries,
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/naming-convention": "off",
    },
  },
);
