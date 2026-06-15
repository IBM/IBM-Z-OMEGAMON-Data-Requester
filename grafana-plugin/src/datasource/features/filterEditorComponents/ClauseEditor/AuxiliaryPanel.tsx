import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { Button, useStyles2 } from '@grafana/ui';
import { stopPropagation } from 'public-ui';
import React from 'react';

import { tid } from 'datasource/components';

function getStyles(theme: GrafanaTheme2) {
  return {
    container: css({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '1em',
      gap: '0.8em',
      borderLeft: `2px solid ${theme.colors.border.strong}`,
      background: theme.colors.background.secondary,
    }),
  };
}

type AuxiliaryPanelProps = {
  onSave: () => void;
  onCancel: () => void;
};
export function AuxiliaryPanel({ onSave, onCancel }: AuxiliaryPanelProps) {
  const styles = useStyles2(getStyles);
  return (
    // TO DO Add stopPropagation on Click
    <div className={styles.container} onClick={stopPropagation}>
      <Button onClick={onCancel} variant="secondary" data-testid={tid('clause-editor.edit-mode.cancel')}>
        Cancel
      </Button>
      <Button onClick={onSave} data-testid={tid('clause-editor.edit-mode.done')}>
        Done
      </Button>
    </div>
  );
}
