import { css } from '@emotion/css';
import { GrafanaTheme2, SelectableValue } from '@grafana/data';
import { Alert, Field, FieldSet, InlineFieldRow, Input, MultiSelect, Select, useStyles2 } from '@grafana/ui';
import { AffinityId } from 'public-domain';
import { FilterEditor } from 'public-ui';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { CollapseWithInfoIcon, tid } from 'datasource/components';
import {
  AGGREGATION_INTERVAL,
  MetricsQueryFilter,
  TimeSeriesQueryParams,
  TIME_SERIES_AGGREGATION_FUNCS,
  TimeSeriesAggregationFuncName,
} from 'datasource/domain';
import { ConnectorLabel, NoFiltersMessage, useFilterEditorStyles } from 'datasource/features/filterEditorComponents';
import { ClauseEditor } from 'datasource/features/filterEditorComponents/ClauseEditor';
import { useTableMetadata, CurrentTableMetadataProvider } from 'datasource/features/metadata';
import { useAppsAndTablesOptions, ManagedSystemsSelector } from 'datasource/features/QueryEditorForm';

import { TimeBucketAggregationSection } from './TimeBucketAggregationSection';
import { TimeSeriesLabelsSelector } from './TimeSeriesLabelsSelector';
import { TimeSeriesMetricsSelector } from './TimeSeriesMetricsSelector';
import { TimeSeriesOrderBySelector } from './TimeSeriesOrderBySelector';

const getStyles = (theme: GrafanaTheme2) => {
  const fieldRowMaxWidth = `${theme.breakpoints.values.md}${theme.breakpoints.unit}`;
  const narrowGapInFieldRow = theme.spacing(2);
  const basisWidthOfWideFieldInFieldRow = `calc((${fieldRowMaxWidth} - ${narrowGapInFieldRow}) / 2)`;
  return {
    applicationAndTableFieldRow: css({
      maxWidth: fieldRowMaxWidth,
      columnGap: narrowGapInFieldRow,
    }),
    applicationOrTableField: css({
      flexBasis: basisWidthOfWideFieldInFieldRow,
      flexGrow: 1,
    }),
    limitAndRankingFieldRow: css({
      columnGap: narrowGapInFieldRow,
    }),
    limitField: css({
      flexBasis: '15%',
      flexShrink: 0,
    }),
    rankingMetricField: css({
      flexGrow: 1,
    }),
    warningMessage: css({
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    }),
  };
};

interface TimeSeriesQueryEditorFormProps {
  isVariableQueryEditor: boolean;
  params: TimeSeriesQueryParams;
  changeTimeSeriesQueryParams: (changedParams: Partial<TimeSeriesQueryParams>) => void;
}

export function TimeSeriesQueryEditorForm({
  params,
  changeTimeSeriesQueryParams,
  isVariableQueryEditor,
}: TimeSeriesQueryEditorFormProps) {
  const [isFiltersCollapseExpanded, setIsFiltersCollapseExpanded] = useState(false);

  const { applicationOptionsResult, tableOptionsResult } = useAppsAndTablesOptions();

  const tableMetadata = useTableMetadata(params.tableId).data ?? null;

  const styles = useStyles2(getStyles);

  const changeFilter = useCallback(
    (changedFilter?: MetricsQueryFilter) => {
      changeTimeSeriesQueryParams({ filter: changedFilter });
    },
    [changeTimeSeriesQueryParams]
  );

  const filterEditorStyles = useFilterEditorStyles();

  // Validation flags for invalid query configurations
  const allLabelsSelected = useMemo(() => {
    if (!tableMetadata) {
      return false;
    }
    const stringColumns = Object.values(tableMetadata.columns).filter(
      (col) => col.timeSeriesRole === 'label' || col.timeSeriesRole === 'originnode'
    );
    return params.labels.length > 0 && params.labels.length >= stringColumns.length;
  }, [tableMetadata, params.labels]);

  const noLabelsSelected = params.labels.length === 0;
  const isNoBucketAggregation = params.aggregationIntervalMs === 0;

  // Warn when no labels and no bucket aggregation are selected
  const showNoLabelsNoBucketWarning = noLabelsSelected && isNoBucketAggregation;
  // Warn when all labels are selected with no bucket aggregation
  const showAllLabelsNoBucketWarning = allLabelsSelected && isNoBucketAggregation;
  // Disable aggregation functions when all labels selected + no bucket aggregation
  // because in this mode data is returned raw (unaggregated) — one row per unique
  // label combination — so applying an aggregation function is not meaningful.
  const disableAggregationFunction = allLabelsSelected && isNoBucketAggregation;

  // Inline validation for managed systems (no Formula editor in time series)
  const agentsValidationMessage =
    params.columns && params.columns.length > 0 && params.agentsAndGroups.length === 0
      ? 'Query has no agents or groups selected'
      : undefined;

  // Auto-clear aggregation functions when they become disabled
  useEffect(() => {
    if (disableAggregationFunction && params.aggregationFunctions.length > 0) {
      changeTimeSeriesQueryParams({ aggregationFunctions: [] });
    }
  }, [disableAggregationFunction, params.aggregationFunctions.length, changeTimeSeriesQueryParams]);

  // The Ranking metric selector is disabled when:
  // - no attribute group is selected (no table metadata to derive columns from), OR
  // - no aggregation functions are selected AND the aggregation function field is not
  //   intentionally disabled (i.e. we are NOT in the all-labels + no-bucket raw mode).
  // Exception: in the all-labels + no-bucket raw mode, aggregation functions are
  // auto-cleared but the ranking metric must remain enabled to allow plain column ordering.
  const isOrderBySelectorDisabled =
    !params.tableId || (params.aggregationFunctions.length === 0 && !disableAggregationFunction);
  useEffect(() => {
    if (isOrderBySelectorDisabled && params.orderBy.length > 0) {
      changeTimeSeriesQueryParams({ orderBy: [] });
    }
  }, [isOrderBySelectorDisabled, params.orderBy.length, changeTimeSeriesQueryParams]);

  /** Aggregation function options for the dropdown */
  const aggregationFunctionOptions: Array<SelectableValue<TimeSeriesAggregationFuncName>> = useMemo(
    () =>
      TIME_SERIES_AGGREGATION_FUNCS.map((func) => ({
        label: func,
        value: func,
      })),
    []
  );

  return (
    <CurrentTableMetadataProvider tableMetadata={tableMetadata}>
      <FieldSet>
        {/* Application and Attribute Group selection - same as Real time metrics */}
        <InlineFieldRow className={styles.applicationAndTableFieldRow}>
          <Field
            label="Application"
            className={styles.applicationOrTableField}
            data-testid={tid('query-editor.field.application')}
          >
            <Select
              isLoading={applicationOptionsResult.isFetching}
              options={applicationOptionsResult.data}
              value={params.affinityId}
              onChange={(applicationOption: SelectableValue<AffinityId> | null) => {
                changeTimeSeriesQueryParams({
                  affinityId: applicationOption?.value ?? ('' as AffinityId),
                  tableId: '',
                  agentsAndGroups: [],
                  columns: [],
                  labels: [],
                  orderBy: [],
                  aggregationFunctions: [],
                  aggregationIntervalMs: AGGREGATION_INTERVAL.AUTOMATIC,
                  filter: undefined,
                });
              }}
              isClearable
              isSearchable
            />
          </Field>
          <Field
            label="Attribute group"
            className={styles.applicationOrTableField}
            data-testid={tid('query-editor.field.attribute-group')}
          >
            <Select
              isLoading={tableOptionsResult[params.affinityId]?.isFetching || false}
              options={tableOptionsResult[params.affinityId]?.data}
              value={params.tableId || null}
              onChange={(tableOption) => {
                changeTimeSeriesQueryParams({
                  tableId: tableOption?.value ?? '',
                  columns: [],
                  labels: [],
                  orderBy: [],
                  aggregationFunctions: [],
                  filter: undefined,
                });
              }}
              disabled={!params.affinityId}
              isClearable
              isSearchable
            />
          </Field>
        </InlineFieldRow>

        {/* Managed Systems - same as Real time metrics */}
        <ManagedSystemsSelector
          affinityId={params.affinityId}
          agentsAndGroups={params.agentsAndGroups}
          changeMetricsQueryParams={(changes) => {
            changeTimeSeriesQueryParams({
              agentsAndGroups: changes.agentsAndGroups,
            });
          }}
          validationMessage={agentsValidationMessage}
        />

        {/* Labels (Group By) - only string-type columns shown as FilterPill */}
        <TimeSeriesLabelsSelector
          tableId={params.tableId}
          labels={params.labels}
          changeTimeSeriesQueryParams={changeTimeSeriesQueryParams}
        />

        {/* Time bucket aggregation */}
        <TimeBucketAggregationSection
          aggregationIntervalMs={params.aggregationIntervalMs}
          changeTimeSeriesQueryParams={changeTimeSeriesQueryParams}
        />

        {/* Validation warnings */}
        {showNoLabelsNoBucketWarning && (
          <Alert severity="warning" title="" className={styles.warningMessage}>
            Invalid selection: No bucket aggregations requires some label selection. Alternatively, select different
            Time bucket aggregation, if labels are not required
          </Alert>
        )}
        {showAllLabelsNoBucketWarning && !showNoLabelsNoBucketWarning && (
          <Alert severity="warning" title="" className={styles.warningMessage}>
            When all labels are selected with No bucket aggregation other aggregation functions are automatically
            disabled.
          </Alert>
        )}

        {/* Metrics (Display Attributes) - only numeric columns */}
        <TimeSeriesMetricsSelector
          tableId={params.tableId}
          columns={params.columns}
          changeTimeSeriesQueryParams={changeTimeSeriesQueryParams}
        />

        {/* Aggregation function dropdown */}
        <Field label="Aggregation function" data-testid={tid('query-editor.time-series.field.aggregation-function')}>
          <MultiSelect
            options={aggregationFunctionOptions}
            value={params.aggregationFunctions}
            onChange={(rawOptions) => {
              const selected = rawOptions.map((o) => o.value).filter((v): v is TimeSeriesAggregationFuncName => !!v);
              changeTimeSeriesQueryParams({ aggregationFunctions: selected });
            }}
            disabled={!params.tableId || disableAggregationFunction}
            isClearable
            isSearchable
            closeMenuOnSelect={false}
            placeholder="Select function"
          />
        </Field>

        {/* Filters - same as Real time metrics */}
        <CollapseWithInfoIcon
          label="Filters"
          title="Specify filters in the query"
          isOpen={isFiltersCollapseExpanded}
          testId={tid('query-editor.time-series.collapse.filters')}
          onToggle={() => setIsFiltersCollapseExpanded((v) => !v)}
        >
          <FilterEditor
            filter={params.filter}
            changeFilter={changeFilter}
            NoFiltersMessage={NoFiltersMessage}
            ClauseEditor={ClauseEditor}
            ConnectorLabel={ConnectorLabel}
            styles={filterEditorStyles}
          />
        </CollapseWithInfoIcon>

        {/* Limit and Ranking metric - same row */}
        <InlineFieldRow className={styles.limitAndRankingFieldRow}>
          <Field label="Limit" className={styles.limitField} data-testid={tid('query-editor.time-series.field.limit')}>
            <Input
              type="number"
              min={1}
              value={params.limit ?? ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const raw = e.target.value;
                const parsed = parseInt(raw, 10);
                changeTimeSeriesQueryParams({ limit: raw === '' || isNaN(parsed) || parsed < 1 ? undefined : parsed });
              }}
              disabled={!params.tableId}
              placeholder="Enter"
            />
          </Field>

          {/* Order By */}
          <TimeSeriesOrderBySelector
            tableId={params.tableId}
            orderBy={params.orderBy}
            aggregationFunctions={params.aggregationFunctions}
            disabled={isOrderBySelectorDisabled}
            className={styles.rankingMetricField}
            changeTimeSeriesQueryParams={changeTimeSeriesQueryParams}
          />
        </InlineFieldRow>
      </FieldSet>
    </CurrentTableMetadataProvider>
  );
}
