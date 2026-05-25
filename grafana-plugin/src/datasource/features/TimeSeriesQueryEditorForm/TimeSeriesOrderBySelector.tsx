import { Field, Select } from '@grafana/ui';
import React, { useMemo } from 'react';

import { tid } from 'datasource/components';
import {
  MetricsQueryOrderByItem,
  TIME_SERIES_AGGREGATION_FUNCS,
  TimeSeriesAggregationFuncName,
  TimeSeriesQueryParams,
} from 'datasource/domain';
import { useTableMetadata } from 'datasource/features/metadata';
import { FormOptionsResult, SelectableFormOption, getFormOptionsResult } from 'datasource/features/QueryEditorForm';

type TimeSeriesOrderByOption = SelectableFormOption & { orderByItem: MetricsQueryOrderByItem };

function stringifyOrderByItem({ columnId, aggregationFunction, type }: MetricsQueryOrderByItem): string {
  return aggregationFunction ? `${aggregationFunction}(${columnId}):${type}` : `${columnId}:${type}`;
}

function useTimeSeriesOrderByOptions(
  tableId: string,
  currOrderBy: MetricsQueryOrderByItem[],
  aggregationFunctions: TimeSeriesAggregationFuncName[]
): FormOptionsResult<TimeSeriesOrderByOption> {
  const tableMetadataResult = useTableMetadata(tableId);

  const options = useMemo(() => {
    if (!tableMetadataResult.data) {
      return undefined;
    }

    // All metric columns from table metadata are offered as ranking candidates,
    // regardless of which metric columns the user has selected for display.
    const metricColumns = Object.values(tableMetadataResult.data.columns).filter(
      (col) => col.timeSeriesRole === 'metric'
    );

    return metricColumns.flatMap((col) => {
      const result: TimeSeriesOrderByOption[] = [];

      if (aggregationFunctions.length === 0) {
        // No aggregation functions selected — this happens when all labels are selected
        // with "No bucket aggregation". In this case data is returned raw (unaggregated),
        // so ranking options are plain column values without any aggregation wrapper.
        const ascItem: MetricsQueryOrderByItem = { columnId: col.id, type: 'ASC' };
        const existingAsc = currOrderBy.find(
          (ob) => ob.columnId === col.id && ob.aggregationFunction === undefined && ob.type === 'ASC'
        );
        result.push({
          label: `${col.name} (ASC)`,
          value: stringifyOrderByItem(ascItem),
          description: col.description,
          orderByItem: existingAsc ?? ascItem,
        });

        const descItem: MetricsQueryOrderByItem = { columnId: col.id, type: 'DESC' };
        const existingDesc = currOrderBy.find(
          (ob) => ob.columnId === col.id && ob.aggregationFunction === undefined && ob.type === 'DESC'
        );
        result.push({
          label: `${col.name} (DESC)`,
          value: stringifyOrderByItem(descItem),
          description: col.description,
          orderByItem: existingDesc ?? descItem,
        });
      } else {
        // Aggregation functions are selected — always offer all supported functions
        // (AVG, MIN, MAX, SUM) as ranking options, not just the ones currently selected.
        // This allows the user to rank by any aggregated metric regardless of which
        // aggregation functions are active in the query.
        TIME_SERIES_AGGREGATION_FUNCS.forEach((func) => {
          const ascItem: MetricsQueryOrderByItem = { columnId: col.id, aggregationFunction: func, type: 'ASC' };
          const existingAsc = currOrderBy.find(
            (ob) => ob.columnId === col.id && ob.aggregationFunction === func && ob.type === 'ASC'
          );
          result.push({
            label: `${func}(${col.name}) (ASC)`,
            value: stringifyOrderByItem(ascItem),
            description: col.description,
            orderByItem: existingAsc ?? ascItem,
          });

          const descItem: MetricsQueryOrderByItem = { columnId: col.id, aggregationFunction: func, type: 'DESC' };
          const existingDesc = currOrderBy.find(
            (ob) => ob.columnId === col.id && ob.aggregationFunction === func && ob.type === 'DESC'
          );
          result.push({
            label: `${func}(${col.name}) (DESC)`,
            value: stringifyOrderByItem(descItem),
            description: col.description,
            orderByItem: existingDesc ?? descItem,
          });
        });
      }

      return result;
    });
  }, [tableMetadataResult, currOrderBy, aggregationFunctions]);

  return getFormOptionsResult(tableMetadataResult, options);
}

type TimeSeriesOrderBySelectorProps = Pick<TimeSeriesQueryParams, 'tableId' | 'orderBy' | 'aggregationFunctions'> & {
  changeTimeSeriesQueryParams: (changedParams: Partial<TimeSeriesQueryParams>) => void;
  disabled?: boolean;
  className?: string;
};

export function TimeSeriesOrderBySelector({
  tableId,
  orderBy,
  aggregationFunctions,
  disabled = false,
  className,
  changeTimeSeriesQueryParams,
}: TimeSeriesOrderBySelectorProps) {
  const orderByOptionsResult = useTimeSeriesOrderByOptions(tableId, orderBy, aggregationFunctions);
  return (
    <Field label="Ranking metric" className={className} data-testid={tid('query-editor.time-series.field.order-by')}>
      <Select
        isLoading={orderByOptionsResult.isFetching}
        options={orderByOptionsResult.data}
        value={orderBy[0] !== undefined ? stringifyOrderByItem(orderBy[0]) : null}
        onChange={(rawOption) => {
          const opt = rawOption as TimeSeriesOrderByOption | null;
          changeTimeSeriesQueryParams({
            orderBy: opt ? [opt.orderByItem] : [],
          });
        }}
        disabled={disabled || !orderByOptionsResult.data}
        isClearable
        isSearchable
      />
    </Field>
  );
}
