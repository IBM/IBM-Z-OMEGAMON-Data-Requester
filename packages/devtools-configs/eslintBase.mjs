import js from "@eslint/js";
import { fixupPluginRules } from "@eslint/compat";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsdocPlugin from "eslint-plugin-jsdoc";

/** @type {import('eslint').Linter.Config[]} */
export const baseConfigs = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      import: fixupPluginRules(importPlugin),
      jsdoc: jsdocPlugin,
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "src/",
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      // Rules from plugin:import/errors + plugin:import/warnings
      "import/namespace": "error",
      "import/default": "error",
      "import/export": "error",
      "import/no-named-as-default": "warn",
      "import/no-named-as-default-member": "warn",
      "import/no-duplicates": "warn",
      // Disabled import rules
      "import/no-unresolved": "off",
      "import/named": "off",
      // Custom import rules
      "no-restricted-imports": ["error", { paths: ["src/", ".config/"] }],
      "import/no-internal-modules": [
        "error",
        { allow: ["**/index.*", "devtools-configs/*"] },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "packages/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "features/**",
              group: "internal",
              position: "after",
            },
          ],
          distinctGroup: true,
          pathGroupsExcludedImportTypes: ["packages/"],
        },
      ],
      "import/newline-after-import": "error",
      "import/no-self-import": "error",
      "import/no-cycle": "error",
      // General rules
      curly: "error",
      "eol-last": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "new-parens": "error",
      "no-array-constructor": "error",
      "no-caller": "error",
      "no-eval": "error",
      "no-new-wrappers": "error",
      "no-var": "error",
      "dot-notation": "error",
      radix: "error",
      "no-duplicate-imports": "error",
      "no-constant-condition": ["error", { checkLoops: false }],
      // TypeScript rules
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-namespace": [
        "error",
        { allowDeclarations: false },
      ],
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true, allowTernary: true },
      ],
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/no-unused-vars": [
        "off",
        { destructuredArrayIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-use-before-define": [
        "error",
        { functions: false },
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "no-public" },
      ],
      // JSDoc rules
      "jsdoc/check-alignment": "error",
    },
  },
];

/** @type {import('eslint').Linter.Config[]} */
const eslintBase = [...baseConfigs, eslintConfigPrettier];

export default eslintBase;
