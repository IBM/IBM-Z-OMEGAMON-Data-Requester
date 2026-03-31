module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project: 'src/',
      },
    },
  },
  plugins: ['jsdoc', '@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
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
    'import/no-internal-modules': [
      'error',
      {
        allow: ['**/index.*'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'], // no "types", cause they should not be separated
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        // splits internal group into 2 subgroups - features/ and common/, domain/, grafana/
        pathGroups: [
          {
            pattern: 'packages/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'features/**',
            group: 'internal',
            position: 'after',
          },
        ],
        distinctGroup: true, // adds empty line between features/ and common/, domain/, grafana/
        pathGroupsExcludedImportTypes: ['packages/'],
      },
    ],
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/newline-after-import': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    curly: 'error',
    'eol-last': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'new-parens': 'error',
    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-eval': 'error',
    'no-new-wrappers': 'error',
    'no-var': 'error',
    'dot-notation': 'error',
    radix: 'error',
    'no-duplicate-imports': 'error',
    'no-constant-condition': ['error', { checkLoops: false }],
    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: false }],
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/no-unused-vars': ['off', { destructuredArrayIgnorePattern: '^_' }], // handled by tsc
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    'jsdoc/check-alignment': 'error',
  },
};
