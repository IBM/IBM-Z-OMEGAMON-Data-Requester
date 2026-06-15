import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { Tooltip, Icon, useStyles2 } from '@grafana/ui';
import React, { useCallback } from 'react';

import { tid } from 'datasource/components';
import { MetricsQueryFilterClause } from 'datasource/domain';
import { useCurrentTableMetadata } from 'datasource/features/metadata';

import { AddClauseButton } from './AddClauseButton';
import { ClauseEditorContainer, ClausePanelContainer, ClauseContainer } from './ClauseEditorStyledComponents';
import { getValueValidationMessage } from './getValueValidationMessage';
import { ReadOnlyClausePanel } from './ReadOnlyClausePanel';
import { RemoveClauseButton } from './RemoveClauseButton';

function getStyles(theme: GrafanaTheme2) {
  return {
    warningContainer: css({
      backgroundColor: theme.colors.error.main,
      color: theme.colors.warning.text,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  };
}

type ViewModeProps = {
  clause: MetricsQueryFilterClause;
  addClauseWithOr: () => void;
  addClauseWithAnd: () => void;
  removeClause: () => void;
  enterClauseEditMode: () => void;
};

export function ViewMode({
  clause,
  addClauseWithOr,
  addClauseWithAnd,
  removeClause,
  enterClauseEditMode,
}: ViewModeProps) {
  const styles = useStyles2(getStyles);
  const tableMetadata = useCurrentTableMetadata();
  const columnMetadata = tableMetadata?.columns[clause.columnId];
  const valueValidationMessage = getValueValidationMessage(clause.userDefinedValue, columnMetadata);

  const onStartEdit = useCallback(
    (_: React.MouseEvent) => {
      // Scheldure it so editor won't be closed the same moment because of
      // click outside
      setTimeout(enterClauseEditMode, 0);
    },
    [enterClauseEditMode]
  );

  return (
    <>
      <ClauseEditorContainer
        isIncorrectClause={!!valueValidationMessage}
        onClick={onStartEdit}
        data-testid={tid('clause-editor.view-mode.container')}
      >
        {!!valueValidationMessage && (
          <Tooltip
            theme="error"
            content={valueValidationMessage}
            placement="bottom"
            show={undefined}
            data-testid={tid('clause-editor.view-mode.validation-message')}
          >
            <div
              className={styles.warningContainer}
              data-testid={tid('clause-editor.view-mode.validation-message.container')}
            >
              <Icon name="exclamation-circle" style={{ color: 'black', width: '2em' }} />
            </div>
          </Tooltip>
        )}
        <ClausePanelContainer>
          <ClauseContainer>
            <ReadOnlyClausePanel
              clause={clause}
              onStartEdit={onStartEdit}
              data-testid={tid('clause-editor.view-mode.clause')}
            />
          </ClauseContainer>
          <RemoveClauseButton removeClause={removeClause} />
          <AddClauseButton addClauseWithOr={addClauseWithOr} addClauseWithAnd={addClauseWithAnd} />
        </ClausePanelContainer>
      </ClauseEditorContainer>
    </>
  );
}
