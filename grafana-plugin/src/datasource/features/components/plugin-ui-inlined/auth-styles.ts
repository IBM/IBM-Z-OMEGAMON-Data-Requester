/**
 * Common styles for Auth components - inlined from @grafana/plugin-ui v0.10.10
 * Source: https://unpkg.com/@grafana/plugin-ui@0.10.10/dist/esm/components//Auth/styles.js
 * License: Apache-2.0
 */

import { css } from '@emotion/css';

export const useCommonStyles = () => {
  return {
    inlineFieldNoMarginRight: css({
      marginRight: 0,
    }),
    // This is dirty hack to make configured secret input grow
    inlineFieldWithSecret: css({
      '[class$="layoutChildrenWrapper"]:first-child': {
        flexGrow: 1,
      },
    }),
  };
};
