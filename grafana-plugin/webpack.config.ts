import { platform } from 'node:process';

// import CopyWebpackPlugin from 'copy-webpack-plugin';
// import ReplaceInFileWebpackPlugin from 'replace-in-file-webpack-plugin';
import type { Configuration, RuleSetRule } from 'webpack';

// eslint-disable-next-line import/no-internal-modules
import grafanaConfig from './.config/webpack/webpack.config';

const exit = (msg: string): never => {
  throw new Error(msg);
};

const config = async (env): Promise<Configuration> => {
  const baseConfig: Configuration = await grafanaConfig(env);

  // [filename] is broken on Windows: https://github.com/swc-project/plugins/issues/79
  const labelFormat = platform === 'win32' ? '[local]' : '[filename]-[local]';

  // baseConfig.plugins?.forEach((plugin) => {
  // if (plugin instanceof CopyWebpackPlugin) {
  //   // @ts-expect-error patterns are "private" it this has to be done
  //   plugin.patterns = plugin.patterns.filter(
  //     (pattern) => !(pattern.from.includes('LICENSE') || pattern.from.includes('CHANGELOG.md'))
  //   );
  // }

  // if (plugin instanceof ReplaceInFileWebpackPlugin) {
  //   plugin[0].files.push('./src/plugin.json');
  // }
  // });

  const swcPlugins =
    baseConfig.mode === 'development'
      ? [
          [
            '@swc/plugin-emotion',
            {
              autoLabel: 'dev-only',
              labelFormat,
            },
          ],
        ]
      : [];

  // @ts-expect-error rules can be "..."
  const rules: RuleSetRule[] = baseConfig.module?.rules ?? exit('Cannot find rules in base (Grafana) webpack config');

  // @ts-expect-error use can be a string but we don't care
  const swcRules = rules.filter((rule) => rule.use?.loader === 'swc-loader');

  swcRules.forEach((rule) => {
    // @ts-expect-error typings are stupid
    rule.use.options.jsc.experimental = {
      plugins: swcPlugins,
    };
  });

  // We have modified it instead of creating a new one
  return baseConfig;
};

export default config;
