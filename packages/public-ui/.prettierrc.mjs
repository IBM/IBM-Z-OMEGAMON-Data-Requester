// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

import prettierConfig from 'devtools-configs/prettier.mjs';

export default {
  ...prettierConfig,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app.css',
};
