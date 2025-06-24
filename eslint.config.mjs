import globals from "globals";
import tseslint from "typescript-eslint";
import eslint from '@eslint/js';
import { defineConfig } from "eslint/config";

export default tseslint.config(
  // eslint.configs.all,
  // tseslint.configs.recommendedTypeChecked,
  // tseslint.configs.stylisticTypeChecked,
  tseslint.configs.all,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
 //   extends: [tseslint.configs.disableTypeChecked],
    rules: {
      semi: "error",
      "prefer-const": "error",
      "sort-keys": "off",
      "no-magic-numbers": 'warn',
      "@typescript-eslint/prefer-readonly-parameter-types": 'off',
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/default-param-last": "warn",
      "@typescript-eslint/no-magic-numbers": "warn",
    },
  },
);

// export default tseslint.config(
//   tseslint.configs.recommendedTypeChecked,
// );

// export default defineConfig([
//   {
//     files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
//     rules: {
//       semi: "error",
//       "prefer-const": "error",
//     },
//   },
// ]);

// export default defineConfig([
//   // eslint.configs.recommended,
//   // tseslint.configs.recommended,
//   tseslint.configs.recommendedTypeChecked,
//   // tseslint.configs.stylisticTypeChecked,
//   {
//     files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
//     languageOptions: {
//       globals: globals.browser,
//       parserOptions: {
//         projectService: true,
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//   },
// ]);
