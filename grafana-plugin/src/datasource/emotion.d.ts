import '@emotion/react';
import { GrafanaTheme2 } from '@grafana/data';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends GrafanaTheme2 {}
}
