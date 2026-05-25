import eslintReact from 'devtools-configs/eslintReact.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist/', 'build/', 'coverage/', '.config/', 'provisioning/', '*.config.mjs', '.prettierrc.mjs'] },
  ...eslintReact,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: ['src/', '.config/'],
          patterns: [
            {
              group: ['../'],
              message:
                "Relative imports using '../' are not allowed, use workspace-relative imports instead (e.g. 'features/metadata').",
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
  {
    files: ['src/datasource/features/versioning/**/*.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      'no-useless-assignment': 'off',
    },
  },
  {
    files: ['tests/**/*'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
];
