import { MultiSelect, Field } from '@grafana/ui';
import React, { useMemo, memo } from 'react';

import { tid } from 'datasource/components';
import { TimeSeriesQueryParams } from 'datasource/domain';
import { useTableMetadata } from 'datasource/features/metadata';
import { FormOptionsResult, SelectableFormOption, getFormOptionsResult } from 'datasource/features/QueryEditorForm';

/**
 * Only shows numeric-type columns for Time-series metrics selection.
 */
function useNumericColumnOptions(tableId: string): FormOptionsResult<SelectableFormOption> {
  const tableMetadataResult = useTableMetadata(tableId);
  const columnOptions = useMemo(() => {
    if (!tableMetadataResult.data) {
      return undefined;
    }
    return Object.values(tableMetadataResult.data.columns)
      .filter((col) => col.timeSeriesRole === 'metric')
      .map((col) => ({
        label: col.name,
        value: col.id,
        description: col.description,
      }));
  }, [tableMetadataResult.data]);

  return getFormOptionsResult(tableMetadataResult, columnOptions);
}

type TimeSeriesMetricsSelectorProps = Pick<TimeSeriesQueryParams, 'tableId' | 'columns'> & {
  changeTimeSeriesQueryParams: (changedParams: Partial<TimeSeriesQueryParams>) => void;
};

/**
 * Display attribute names is labelled as "Metrics" for Time-series tab.
 * Only numeric columns are shown in the selector.
 */
export const TimeSeriesMetricsSelector = memo(
  ({ tableId, columns, changeTimeSeriesQueryParams }: TimeSeriesMetricsSelectorProps) => {
    const columnOptionsResult = useNumericColumnOptions(tableId);

    return (
      <Field label="Metrics" data-testid={tid('query-editor.time-series.field.metrics')}>
        <MultiSelect
          isLoading={columnOptionsResult.isFetching}
          options={columnOptionsResult.data}
          value={columns}
          placeholder="Choose"
          onChange={(rawOptions) => {
            const options = rawOptions as SelectableFormOption[];
            const newColumns = options.map((o) => o.value);
            changeTimeSeriesQueryParams({ columns: newColumns });
          }}
          disabled={!tableId}
          isClearable
          isSearchable
          closeMenuOnSelect={false}
        />
      </Field>
    );
  }
);

TimeSeriesMetricsSelector.displayName = 'TimeSeriesMetricsSelector';
