import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';
import { stopPropagation } from 'public-ui';
import React, { useEffect } from 'react';

import { MetricsQueryFilterClause } from 'datasource/domain';
import { useCurrentTableMetadata } from 'datasource/features/metadata';

import { AddClauseButton } from './AddClauseButton';
import { AuxiliaryPanel } from './AuxiliaryPanel';
import { ClauseEditorContainer, ClausePanelContainer, ClauseContainer } from './ClauseEditorStyledComponents';
import { getValueValidationMessage } from './getValueValidationMessage';
import { MainEditorPanel } from './MainEditorPanel';
import { RemoveClauseButton } from './RemoveClauseButton';

function getStyles(theme: GrafanaTheme2) {
  return {
    warningBorder: css({ borderLeft: `2px solid ${theme.colors.error.main}` }),
  };
}

type EditModeProps = {
  clause: MetricsQueryFilterClause;
  addClauseWithOr: () => void;
  addClauseWithAnd: () => void;
  removeClause: () => void;
  cancelClauseEdit: () => void;
  submitClauseEdit: () => void;
  editClausePartially: (editedClauseFields: Partial<MetricsQueryFilterClause>) => void;
};

export function EditMode({
  clause,
  addClauseWithOr,
  addClauseWithAnd,
  removeClause,
  cancelClauseEdit,
  submitClauseEdit,
  editClausePartially,
}: EditModeProps) {
  const styles = useStyles2(getStyles);
  const tableMetadata = useCurrentTableMetadata();
  const columnId = clause.columnId;
  const columnMetadata = tableMetadata?.columns[columnId];
  const valueValidationMessage = getValueValidationMessage(clause.userDefinedValue, columnMetadata);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as HTMLElement | null;

      // Grafana's Select renders dropdown menus in a portal outside the component tree.
      // Clicks on portaled menus must be ignored to keep the editor open.
      // - Grafana 12: portal is inside div.grafana-app (target is that div itself)
      // - Grafana 13+: portal is inside #grafana-portal-container
      // - Legacy: portal target was document.body
      if (
        !target ||
        target.nodeName === 'BODY' ||
        target.closest('#grafana-portal-container') ||
        target.classList.contains('grafana-app')
      ) {
        return;
      }

      submitClauseEdit();
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [submitClauseEdit]);

  return (
    <>
      <ClauseEditorContainer isIncorrectClause={!!valueValidationMessage} onClick={stopPropagation}>
        {!!valueValidationMessage && <div className={styles.warningBorder} />}
        <ClausePanelContainer>
          <ClauseContainer>
            <MainEditorPanel
              clause={clause}
              editClausePartially={editClausePartially}
              valueValidationMessage={valueValidationMessage}
            />
          </ClauseContainer>
          <RemoveClauseButton removeClause={removeClause} />
          <AddClauseButton addClauseWithOr={addClauseWithOr} addClauseWithAnd={addClauseWithAnd} />
        </ClausePanelContainer>
      </ClauseEditorContainer>
      <AuxiliaryPanel onCancel={cancelClauseEdit} onSave={submitClauseEdit} />
    </>
  );
}
