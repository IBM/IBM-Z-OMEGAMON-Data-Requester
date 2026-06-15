import { IconName } from '@grafana/data';
import { RadioButtonGroup, Field } from '@grafana/ui';
import React, { useCallback } from 'react';

import { tid } from 'datasource/components';
import { FalconQueryType, FalconQuery } from 'datasource/domain';
import { FormulaEditor } from 'datasource/features/FormulaEditor';
import { QueryEditorForm } from 'datasource/features/QueryEditorForm';
import { TimeSeriesQueryEditorForm } from 'datasource/features/TimeSeriesQueryEditorForm';

import { ManagedSystemsQueryEditor } from './ManagedSystemsQueryEditor';
import { useQueryState } from './useQueryState';

type QueryTypeOption = {
  label: string;
  value: FalconQueryType;
  icon?: IconName;
};

const queryTypeOptionsForVariableQueryEditor: QueryTypeOption[] = [
  { label: 'Real-time metrics', value: 'metrics', icon: 'clock-nine' },
  { label: 'Time-series', value: 'time-series', icon: 'chart-line' },
  { label: 'Managed Systems', value: 'managedSystems' },
];

const queryTypeOptions: QueryTypeOption[] = [
  { label: 'Real-time metrics', value: 'metrics', icon: 'clock-nine' },
  { label: 'Time-series', value: 'time-series', icon: 'chart-line' },
  { label: 'Situation Events', value: 'situations', icon: 'sitemap' },
  { label: 'Managed Systems', value: 'managedSystems' },
];

interface QueryEditorProps {
  query: FalconQuery;
  isVariableQueryEditor: boolean;
  changeQuery(newQuery: FalconQuery): void;
  runQuery(): void;
}

export function QueryEditor({ query, changeQuery, runQuery, isVariableQueryEditor }: QueryEditorProps) {
  const { changeQueryType, changeMetricsQueryParams, changeTimeSeriesQueryParams, changeManagedSystemsQueryParams } =
    useQueryState(query, changeQuery);

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
      {query.queryType === 'time-series' && (
        <TimeSeriesQueryEditorForm
          isVariableQueryEditor={isVariableQueryEditor}
          params={query.falconParams}
          changeTimeSeriesQueryParams={changeTimeSeriesQueryParams}
        />
      )}
      {query.queryType === 'managedSystems' && (
        <ManagedSystemsQueryEditor
          params={query.managedSystemsParams}
          changeManagedSystemsQueryParams={changeManagedSystemsQueryParams}
        />
      )}
    </>
  );
}
