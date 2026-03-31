const baseEslintConfig = require('./eslintBase.cjs');

module.exports = {
  ...baseEslintConfig,
  settings: {
    ...baseEslintConfig.settings,
    react: {
      version: 'detect',
    },
  },
  plugins: [...baseEslintConfig.plugins, 'react-hooks'],
  extends: [...baseEslintConfig.extends, 'plugin:react-hooks/recommended', 'plugin:react/recommended'],
  rules: {
    ...baseEslintConfig.rules,
    'react-hooks/exhaustive-deps': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
