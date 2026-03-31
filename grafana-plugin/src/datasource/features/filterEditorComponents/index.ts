import { css } from '@emotion/css';
import { useTheme2 } from '@grafana/ui';
import { type FilterEditorStyles } from 'public-ui';

export { ConnectorLabel } from './ConnectorLabel';
export { NoFiltersMessage } from './NoFiltersMessage';

export function useFilterEditorStyles(): FilterEditorStyles {
  const theme = useTheme2();
  const lineDefinition = `2px solid ${theme.colors.primary.main}`;
  const grayoutPanelClassName = css`
    background-color: ${theme.colors.background.secondary};
    border-left: 2px solid ${theme.colors.border.strong};
  `;
  return {
    lineDefinition,
    grayoutPanelClassName,
  };
}
