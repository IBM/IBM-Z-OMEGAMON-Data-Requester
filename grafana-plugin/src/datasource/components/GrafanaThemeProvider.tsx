import { ThemeProvider } from '@emotion/react';
import { useTheme2 } from '@grafana/ui';
import React, { PropsWithChildren } from 'react';

type GrafanaThemeProviderProps = PropsWithChildren<unknown>;

/** Provides grafana theme as a emotion theme making it available in @emotion/styled, @emotion/react, etc */
export function GrafanaThemeProvider({ children }: GrafanaThemeProviderProps) {
  const theme = useTheme2();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
