import eslintReact from 'devtools-configs/eslintReact.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'dist/',
      'build/',
      'coverage/',
      'storybook-static/',
      '.storybook/',
      'esm-shims/',
      '*.config.mjs',
      '.prettierrc.mjs',
    ],
  },
  ...eslintReact,
  {
    rules: {
      'no-empty-pattern': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
];
