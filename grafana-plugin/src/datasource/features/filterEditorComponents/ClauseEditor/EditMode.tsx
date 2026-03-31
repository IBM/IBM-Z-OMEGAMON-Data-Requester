import styled from '@emotion/styled';
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

const WarningBorder = styled.div`
  border-left: 2px solid ${({ theme }) => theme.colors.error.main};
`;

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
  const tableMetadata = useCurrentTableMetadata();
  const columnId = clause.columnId;
  const columnMetadata = tableMetadata?.columns[columnId];
  const valueValidationMessage = getValueValidationMessage(clause.userDefinedValue, columnMetadata);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as HTMLElement | null;

      // Grafana's select is built on top of react-select which renders list of
      // items in body element. This means that clicks on select will register as
      // clicks on body element.
      if (target?.nodeName === 'BODY') {
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
        {!!valueValidationMessage && <WarningBorder />}
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
