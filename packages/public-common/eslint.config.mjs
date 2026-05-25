import eslintBase from 'devtools-configs/eslintBase.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [{ ignores: ['dist/', 'build/', 'coverage/', '*.config.mjs', '.prettierrc.mjs'] }, ...eslintBase];
