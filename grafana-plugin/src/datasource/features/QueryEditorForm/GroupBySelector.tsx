import { MultiSelect, Field } from '@grafana/ui';
import React, { useMemo, memo } from 'react';

import { tid } from 'datasource/components';
import { MetricsQueryColumn, MetricsQueryParams } from 'datasource/domain';
import { useTableMetadata } from 'datasource/features/metadata';

import { FormOptionsResult, getFormOptionsResult, SelectableFormOption } from './formOptionsHooks';

/** Removes columns that don't satisfy current group by restrictions
 * (columns with wrong aggregation functions).
 *
 * For example:
 * 1. User selects 'None' in group by field
 * 2. User selects FIELD1 and FIELD2 as columns to select. Query now is 'SELECT FIELD1, FIELD2 ...'
 * 3. User selects FIELD1 in group by field. Selecting FIELD2 now don't make any sense because
 * it requires aggregation function. Thus, this function will remove FIELD2.
 */
function filterColumnsWithOutdatedAggregation(columns: MetricsQueryColumn[], groupBy: string[]): MetricsQueryColumn[] {
  if (!groupBy.length) {
    // Remove all columns with aggregation function defined
    return columns.filter((column) => !column.aggregationFunction);
  }
  return columns.filter((column) => {
    const columnIsAggregated = !!column.aggregationFunction;
    const columnIsInGroupBy = groupBy.includes(column.id);

    return columnIsAggregated !== columnIsInGroupBy;
  });
}

function useColumnOptions(tableId: string): FormOptionsResult {
  const tableMedatadaResult = useTableMetadata(tableId);
  const columnOptions = useMemo(
    () =>
      tableMedatadaResult.data
        ? Object.values(tableMedatadaResult.data.columns).map((v) => ({
            label: v.name,
            value: v.id,
            description: v.description,
          }))
        : undefined,
    [tableMedatadaResult.data]
  );

  const result = getFormOptionsResult(tableMedatadaResult, columnOptions);
  return result;
}

type GroupBySelectorProps = Pick<MetricsQueryParams, 'tableId' | 'columns' | 'groupBy'> & {
  changeMetricsQueryParams: (changedParams: Partial<MetricsQueryParams>) => void;
};

export const GroupBySelector = memo(({ tableId, columns, groupBy, changeMetricsQueryParams }: GroupBySelectorProps) => {
  const columnOptionsResult = useColumnOptions(tableId);

  return (
    <Field label="Group by" data-testid={tid('query-editor.field.group-by')}>
      <MultiSelect
        isLoading={columnOptionsResult.isFetching}
        options={columnOptionsResult.data}
        value={groupBy.map((colId) => colId)}
        placeholder="None"
        onChange={(rawOptions) => {
          const options = rawOptions as SelectableFormOption[];
          const groupBy = options.map((o) => o.value);
          changeMetricsQueryParams({
            groupBy,
            orderBy: [], // ORDER BY doesn't work with grouping
            columns: filterColumnsWithOutdatedAggregation(columns, groupBy),
          });
        }}
        disabled={!tableId}
        isClearable
        isSearchable
        closeMenuOnSelect={false}
      />
    </Field>
  );
});
GroupBySelector.displayName = 'GroupBySelector';
