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

const AGGREGATION_FUNCTION_OPTIONS: Array<SelectableValue<TimeSeriesAggregationFuncName>> =
  TIME_SERIES_AGGREGATION_FUNCS.map((func) => ({ label: func, value: func }));

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
    limitAndRankByFieldRow: css({
      columnGap: narrowGapInFieldRow,
      marginTop: theme.spacing(2),
    }),
    limitField: css({
      flexBasis: '14%',
      flexShrink: 0,
    }),
    validationMessage: css({
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

  const historyEligibleApplications = useMemo(
    () =>
      applicationOptionsResult.data?.filter((app) =>
        tableOptionsResult[app.value]?.data?.some(
          (table) => table.historyCollectionEligibility && table.historyCollectionEligibility !== 'no'
        )
      ),
    [applicationOptionsResult.data, tableOptionsResult]
  );

  const historyEligibleTables = useMemo(
    () =>
      tableOptionsResult[params.affinityId]?.data?.filter(
        (table) => table.historyCollectionEligibility && table.historyCollectionEligibility !== 'no'
      ),
    [tableOptionsResult, params.affinityId]
  );

  const noLabelsSelected = params.labels.length === 0;
  const isNoBucketAggregation = params.aggregationIntervalMinutes === 0;

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

  const isRankBySet = params.orderBy.length > 0;
  const [isLimitFocused, setIsLimitFocused] = useState(false);
  const [isRankByFocused, setIsRankByFocused] = useState(false);
  const showLimitError = !isLimitFocused && params.limit !== undefined && !isRankBySet;
  const showRankByError = !isRankByFocused && isRankBySet && params.limit === undefined;

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
              options={historyEligibleApplications}
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
                  aggregationIntervalMinutes: AGGREGATION_INTERVAL.AUTOMATIC,
                  limit: undefined,
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
              options={historyEligibleTables}
              value={params.tableId || null}
              onChange={(tableOption) => {
                changeTimeSeriesQueryParams({
                  tableId: tableOption?.value ?? '',
                  columns: [],
                  labels: [],
                  orderBy: [],
                  aggregationFunctions: [],
                  aggregationIntervalMinutes: AGGREGATION_INTERVAL.AUTOMATIC,
                  limit: undefined,
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
          aggregationIntervalMinutes={params.aggregationIntervalMinutes}
          changeTimeSeriesQueryParams={changeTimeSeriesQueryParams}
          disabled={!params.tableId}
        />

        {/* Validation warnings */}
        {showNoLabelsNoBucketWarning && params.tableId && (
          <Alert severity="warning" title="" className={styles.validationMessage}>
            Invalid selection: No bucket aggregations requires some label selection. Alternatively, select different
            Time bucket aggregation, if labels are not required
          </Alert>
        )}
        {showAllLabelsNoBucketWarning && !showNoLabelsNoBucketWarning && params.tableId && (
          <Alert severity="warning" title="" className={styles.validationMessage}>
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
            options={AGGREGATION_FUNCTION_OPTIONS}
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

        {/* Limit and Rank by - same row */}
        <InlineFieldRow className={styles.limitAndRankByFieldRow}>
          <Field
            label="Limit"
            className={styles.limitField}
            invalid={showRankByError}
            error={showRankByError ? 'Limit is required' : undefined}
            data-testid={tid('query-editor.time-series.field.limit')}
          >
            <Input
              type="number"
              min={1}
              value={params.limit ?? ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const raw = e.target.value;
                const parsed = parseInt(raw, 10);
                changeTimeSeriesQueryParams({ limit: raw === '' || isNaN(parsed) || parsed < 1 ? undefined : parsed });
              }}
              onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
              onFocus={() => setIsLimitFocused(true)}
              onBlur={() => setIsLimitFocused(false)}
              disabled={!params.tableId}
              placeholder="Enter"
            />
          </Field>

          {/* Rank by */}
          <TimeSeriesOrderBySelector
            key={params.tableId}
            tableId={params.tableId}
            orderBy={params.orderBy}
            disabled={!params.tableId}
            limitRequiresRankBy={showLimitError}
            onRankByFocusChange={(isFocused) => setIsRankByFocused(isFocused)}
            changeTimeSeriesQueryParams={changeTimeSeriesQueryParams}
          />
        </InlineFieldRow>
      </FieldSet>
    </CurrentTableMetadataProvider>
  );
}
