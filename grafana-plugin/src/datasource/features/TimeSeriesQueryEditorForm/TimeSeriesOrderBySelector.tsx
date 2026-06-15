import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { Field, Select, useStyles2 } from '@grafana/ui';
import React, { useMemo, useRef, useState } from 'react';

import { tid } from 'datasource/components';
import { TIME_SERIES_AGGREGATION_FUNCS, TimeSeriesAggregationFuncName, TimeSeriesQueryParams } from 'datasource/domain';
import { useTableMetadata } from 'datasource/features/metadata';
import { SelectableFormOption } from 'datasource/features/QueryEditorForm';

const DIRECTION_OPTIONS: Array<SelectableFormOption<'ASC' | 'DESC'>> = [
  { label: 'ASC', value: 'ASC' },
  { label: 'DESC', value: 'DESC' },
];

const AGGREGATION_OPTIONS: Array<SelectableFormOption<TimeSeriesAggregationFuncName>> =
  TIME_SERIES_AGGREGATION_FUNCS.map((func) => ({ label: func, value: func }));

const getStyles = (theme: GrafanaTheme2) => ({
  aggregationField: css({
    flexBasis: '14%',
    flexShrink: 0,
  }),
  metricField: css({
    flexBasis: '30%',
    flexGrow: 0,
  }),
  directionField: css({
    flexBasis: '14%',
    flexShrink: 0,
  }),
});

type TimeSeriesOrderBySelectorProps = Pick<TimeSeriesQueryParams, 'tableId' | 'orderBy'> & {
  changeTimeSeriesQueryParams: (changedParams: Partial<TimeSeriesQueryParams>) => void;
  limitRequiresRankBy?: boolean;
  onRankByFocusChange?: (isFocused: boolean) => void;
  disabled?: boolean;
};

export function TimeSeriesOrderBySelector({
  tableId,
  orderBy,
  disabled = false,
  changeTimeSeriesQueryParams,
  limitRequiresRankBy = false,
  onRankByFocusChange,
}: TimeSeriesOrderBySelectorProps) {
  const styles = useStyles2(getStyles);
  const tableMetadataResult = useTableMetadata(tableId);

  const metricOptions = useMemo(() => {
    if (!tableMetadataResult.data) {
      return undefined;
    }
    return Object.values(tableMetadataResult.data.columns)
      .filter((col) => col.timeSeriesRole === 'metric')
      .map((col) => ({ label: col.name, value: col.id, description: col.description }));
  }, [tableMetadataResult.data]);

  // Local state holds partial selections so individual dropdowns retain their value
  // while the user is filling in the fields. The parent orderBy is only updated
  // once all three fields are set (all are required).
  const [fields, setFields] = useState<{
    aggregation: TimeSeriesAggregationFuncName | null;
    metric: string | null;
    direction: 'ASC' | 'DESC' | null;
  }>(() => ({
    aggregation: (orderBy[0]?.aggregationFunction ?? (disabled ? null : 'MAX')) as TimeSeriesAggregationFuncName | null,
    metric: orderBy[0]?.columnId ?? null,
    direction: orderBy[0]?.type ?? (disabled ? null : 'DESC'),
  }));

  const selectedMetricRef = useRef<string | null>(orderBy[0]?.columnId ?? null);

  function handleChange(update: Partial<typeof fields>): void {
    const next = { ...fields, ...update };
    setFields(next);
    if (next.aggregation && next.metric && next.direction) {
      changeTimeSeriesQueryParams({
        orderBy: [{ columnId: next.metric, aggregationFunction: next.aggregation, type: next.direction }],
      });
    } else {
      changeTimeSeriesQueryParams({ orderBy: [] });
    }
  }

  return (
    <>
      <Field
        label="Rank by"
        className={styles.aggregationField}
        data-testid={tid('query-editor.time-series.field.order-by-aggregation')}
      >
        <Select
          isLoading={tableMetadataResult.isFetching}
          options={AGGREGATION_OPTIONS}
          value={fields.aggregation}
          onChange={(opt) => {
            handleChange({
              aggregation: (opt as SelectableFormOption<TimeSeriesAggregationFuncName> | null)?.value ?? null,
            });
          }}
          disabled={disabled}
          isSearchable={false}
          placeholder="Select"
        />
      </Field>
      <Field
        label=""
        className={styles.metricField}
        invalid={limitRequiresRankBy && fields.metric === null}
        error={limitRequiresRankBy && fields.metric === null ? 'Rank by is required' : undefined}
        data-testid={tid('query-editor.time-series.field.order-by-metric')}
      >
        <Select
          isLoading={tableMetadataResult.isFetching}
          options={metricOptions}
          value={fields.metric}
          onChange={(opt) => {
            const value = opt?.value ?? null;
            selectedMetricRef.current = value;
            handleChange({ metric: value });
          }}
          onBlur={() => onRankByFocusChange?.(false)}
          onFocus={() => onRankByFocusChange?.(true)}
          disabled={disabled || !metricOptions}
          isClearable
          isSearchable
          placeholder="Select metric"
        />
      </Field>
      <Field
        label=""
        className={styles.directionField}
        data-testid={tid('query-editor.time-series.field.order-by-direction')}
      >
        <Select
          options={DIRECTION_OPTIONS}
          value={fields.direction}
          onChange={(opt) => {
            handleChange({ direction: opt?.value ?? null });
          }}
          disabled={disabled}
          isSearchable={false}
          placeholder="Select"
        />
      </Field>
    </>
  );
}
