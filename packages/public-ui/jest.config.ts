import type { Config } from 'jest';

// It's okay to use undefined variables in this Jest config file because they are provided by the Jest environment
// force timezone to UTC to allow tests to work regardless of local timezone
// generally used by snapshots, but can affect specific tests
process.env.TZ = 'UTC';

const config: Config = {
  // Inform jest to only transform specific node_module packages.
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        sourceMaps: 'inline',
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: false,
            dynamicImport: true,
          },
        },
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],

  modulePaths: ['<rootDir>/src/'],
};

export default config;
