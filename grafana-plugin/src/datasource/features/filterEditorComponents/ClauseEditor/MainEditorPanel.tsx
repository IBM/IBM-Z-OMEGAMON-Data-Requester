import styled from '@emotion/styled';
import { SelectableValue } from '@grafana/data';
import { Select, Input, FieldValidationMessage } from '@grafana/ui';
import React, { useMemo } from 'react';

import { tid } from 'datasource/components';
import { ALLOWED_COMPARISON_OPERATORS, MetricsQueryFilterClause } from 'datasource/domain';
import { useCurrentTableMetadata } from 'datasource/features/metadata';

const Grid = styled.div`
  label: Grid;
  display: grid;
  grid-template-columns: [columnId] 12em [function] 12em [operator] 5.2em [value] auto;
  justify-items: stretch;
`;

const ColumnSelectWrapper = styled.div`
  padding-right: 1em;
`;

const FieldValidationMessageContainer = styled.div`
  position: absolute;
  z-index: 1000;
`;

type MainEditorPanelProps = {
  clause: MetricsQueryFilterClause;
  editClausePartially: (editedClauseFields: Partial<MetricsQueryFilterClause>) => void;
  valueValidationMessage: string | null;
};

export function MainEditorPanel({ clause, editClausePartially, valueValidationMessage }: MainEditorPanelProps) {
  const tableMetadata = useCurrentTableMetadata();

  const columnsOptions = useMemo(() => {
    const columnsArray = Object.values(tableMetadata?.columns ?? {});
    return columnsArray.reduce((acc: SelectableValue[], v) => {
      acc.push({
        label: v.name,
        value: v.id,
        description: v.description,
      });
      return acc;
    }, []);
  }, [tableMetadata]);

  const allowedOperatorsOptions = useMemo(
    () =>
      ALLOWED_COMPARISON_OPERATORS.map((operator) => {
        return { value: operator, label: operator } as SelectableValue;
      }),
    []
  );

  if (!clause.columnId && columnsOptions[0]?.value) {
    editClausePartially({ columnId: columnsOptions[0].value });
  }

  const onColumnChange = (event: SelectableValue) => {
    editClausePartially({ columnId: event.value });
  };

  const onOperatorChange = (event: SelectableValue) => {
    editClausePartially({ operator: event.value });
  };

  const onValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    editClausePartially({ userDefinedValue: event.currentTarget.value });
  };

  return (
    <Grid>
      <ColumnSelectWrapper>
        <Select
          value={clause.columnId}
          options={columnsOptions}
          onChange={onColumnChange}
          isSearchable
          data-testid={tid('clause-editor.edit-mode.column-select')}
        />
      </ColumnSelectWrapper>
      <Select
        onChange={() => {
          return;
        }}
        placeholder="Column function"
        data-testid={tid('clause-editor.edit-mode.function-select')}
      />
      <Select
        value={clause.operator}
        options={allowedOperatorsOptions}
        onChange={onOperatorChange}
        isSearchable
        data-testid={tid('clause-editor.edit-mode.operator-select')}
      />
      <div>
        <Input
          value={clause.userDefinedValue}
          onChange={onValueChange}
          data-testid={tid('clause-editor.edit-mode.value-input')}
        />

        {!!valueValidationMessage && (
          <FieldValidationMessageContainer>
            <div style={{ position: 'relative' }} data-testid={tid('clause-editor.edit-mode.validation-message')}>
              <FieldValidationMessage>{valueValidationMessage}</FieldValidationMessage>
            </div>
          </FieldValidationMessageContainer>
        )}
      </div>
    </Grid>
  );
}
