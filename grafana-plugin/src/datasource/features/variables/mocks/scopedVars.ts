import { ScopedVars } from '@grafana/data';

export const scopedVars = {
  __interval: {
    text: '30s',
    value: '30s',
  },
  __interval_ms: {
    text: '30000',
    value: 30000,
  },
} satisfies ScopedVars;
