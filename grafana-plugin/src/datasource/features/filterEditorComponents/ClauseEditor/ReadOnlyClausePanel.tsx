import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2, IconButton } from '@grafana/ui';
import React from 'react';

import { tid } from 'datasource/components';
import { MetricsQueryFilterClause } from 'datasource/domain';
import { useCurrentTableMetadata } from 'datasource/features/metadata';

function getStyles(theme: GrafanaTheme2) {
  return {
    containerWrapper: css({
      display: 'flex',
      justifyContent: 'left',
      flexDirection: 'row',
      columnGap: '0.3em',
      alignItems: 'center',
    }),
    textContainer: css({ height: '2.3em', lineHeight: '2.3em' }),
    editButton: css({
      ':not(*:hover > * > * > &)': { display: 'none' },
      paddingLeft: '0.5em',
    }),
    emptyString: css({ color: theme.colors.text.disabled }),
  };
}

type ReadOnlyClausePanelProps = {
  clause: MetricsQueryFilterClause;
  onStartEdit: (event: React.MouseEvent) => void;
};

export function ReadOnlyClausePanel({ clause, onStartEdit }: ReadOnlyClausePanelProps) {
  const styles = useStyles2(getStyles);
  const { columnId, operator, userDefinedValue } = clause;

  const tableMetadata = useCurrentTableMetadata();
  const displayName = tableMetadata?.columns[columnId]?.name ?? columnId;

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.textContainer} data-testid={tid('clause-editor.view-mode.column')}>
        {displayName}
      </div>
      <div className={styles.textContainer} data-testid={tid('clause-editor.view-mode.operator')}>
        {operator}
      </div>
      {userDefinedValue !== '' ? (
        <div className={styles.textContainer} data-testid={tid('clause-editor.view-mode.value')}>
          {userDefinedValue}
        </div>
      ) : (
        <div className={styles.emptyString} data-testid={tid('clause-editor.view-mode.empty-string')}>
          {'<empty string>'}
        </div>
      )}
      <IconButton
        aria-label="edit"
        className={styles.editButton}
        name="pen"
        size="lg"
        onClick={onStartEdit}
        data-testid={tid('clause-editor.view-mode.edit-clause')}
      />
    </div>
  );
}
