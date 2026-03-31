import { RadioButtonGroup, Field } from '@grafana/ui';
import React, { useCallback } from 'react';

import { tid } from 'datasource/components';
import { FalconQueryType, FalconQuery } from 'datasource/domain';
import { FormulaEditor } from 'datasource/features/FormulaEditor';
import { QueryEditorForm } from 'datasource/features/QueryEditorForm';

import { useQueryState } from './useQueryState';

type QueryTypeOption = {
  label: string;
  value: FalconQueryType;
};

const queryTypeOptionsForVariableQueryEditor: QueryTypeOption[] = [{ label: 'Metrics', value: 'metrics' }];

const queryTypeOptions: QueryTypeOption[] = [
  ...queryTypeOptionsForVariableQueryEditor,
  { label: 'Situation Events', value: 'situations' },
];

interface QueryEditorProps {
  query: FalconQuery;
  isVariableQueryEditor: boolean;
  changeQuery(newQuery: FalconQuery): void;
  runQuery(): void;
}

export function QueryEditor({ query, changeQuery, runQuery, isVariableQueryEditor }: QueryEditorProps) {
  const { changeQueryType, changeMetricsQueryParams } = useQueryState(query, changeQuery);

  const changeQueryTypeAndRunQuery = useCallback(
    (queryType: FalconQueryType) => {
      changeQueryType(queryType);
      runQuery();
    },
    [runQuery, changeQueryType]
  );

  return (
    <>
      <Field data-testid={tid('query-editor.field.query-types')}>
        <RadioButtonGroup
          options={isVariableQueryEditor ? queryTypeOptionsForVariableQueryEditor : queryTypeOptions}
          value={query.queryType}
          onChange={changeQueryTypeAndRunQuery}
        />
      </Field>
      {query.queryType === 'metrics' && (
        <>
          <QueryEditorForm
            isVariableQueryEditor={isVariableQueryEditor}
            params={query.falconParams}
            changeMetricsQueryParams={changeMetricsQueryParams}
          />
          <FormulaEditor params={query.falconParams} changeMetricsQueryParams={changeMetricsQueryParams} />
        </>
      )}
    </>
  );
}
