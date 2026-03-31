const prettierConfig = require('devtools-configs/prettier.cjs');

module.exports = {
  ...prettierConfig,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app.css',
};
