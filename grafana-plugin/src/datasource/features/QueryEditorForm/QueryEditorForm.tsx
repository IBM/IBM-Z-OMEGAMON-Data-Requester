import { css } from '@emotion/css';
import { GrafanaTheme2, SelectableValue } from '@grafana/data';
import { Field, FieldSet, InlineFieldRow, InlineSwitch, Select, useStyles2 } from '@grafana/ui';
import { AffinityId, writetimeColumnMetadata } from 'public-domain';
import { FilterEditor } from 'public-ui';
import React, { useCallback, useState } from 'react';

import { CollapseWithInfoIcon, tid } from 'datasource/components';
import { MetricsQueryFilter, MetricsQueryParams } from 'datasource/domain';
import { ConnectorLabel, NoFiltersMessage, useFilterEditorStyles } from 'datasource/features/filterEditorComponents';
import { ClauseEditor } from 'datasource/features/filterEditorComponents/ClauseEditor';
import { useTableMetadata, CurrentTableMetadataProvider } from 'datasource/features/metadata';

import { DisplayAttributeSelector } from './DisplayAttributeSelector';
import { useAppsAndTablesOptions } from './formOptionsHooks';
import { GroupBySelector } from './GroupBySelector';
import { ManagedSystemsSelector } from './ManagedSystemsSelector';
import { OrderBySelector } from './OrderBySelector';
import { SystemParmaForm } from './SystemParmaForm';

const getStyles = (theme: GrafanaTheme2) => {
  const fieldRowMaxWidth = `${theme.breakpoints.values.md}${theme.breakpoints.unit}`;
  const narrowGapInFieldRow = theme.spacing(2);
  const basisWidthOfWideFieldInFieldRow = `calc((${fieldRowMaxWidth} - ${narrowGapInFieldRow}) / 2)`;
  const wideGapInFieldRow = theme.spacing(6);
  const basisWidthOfNarrowFieldInFieldRow = `calc(${fieldRowMaxWidth} - ${basisWidthOfWideFieldInFieldRow} - ${wideGapInFieldRow})`;
  return {
    applicationAndTableFieldRow: css({
      maxWidth: fieldRowMaxWidth,
      columnGap: narrowGapInFieldRow,
    }),
    applicationOrTableField: css({
      flexBasis: basisWidthOfWideFieldInFieldRow,
      flexGrow: 1,
    }),

    orderByField: css({
      marginTop: theme.spacing(2),
    }),

    rowLimitAndHistoryFieldRow: css({
      maxWidth: fieldRowMaxWidth,
      columnGap: narrowGapInFieldRow,
    }),
    historyField: css({
      flexBasis: basisWidthOfNarrowFieldInFieldRow,
      flexGrow: 1,
    }),
    historySwitch: css({
      padding: 0,
      flexDirection: 'row-reverse',
      columnGap: theme.spacing(2),
    }),
  };
};

interface QueryEditorFormProps {
  isVariableQueryEditor: boolean;
  params: MetricsQueryParams;
  changeMetricsQueryParams: (changedParams: Partial<MetricsQueryParams>) => void;
}

export function QueryEditorForm({ params, changeMetricsQueryParams, isVariableQueryEditor }: QueryEditorFormProps) {
  const [isFiltersCollapseExpanded, setIsFiltersCollapseExpanded] = useState(false);

  const { applicationOptionsResult, tableOptionsResult } = useAppsAndTablesOptions();

  const tableMetadata = useTableMetadata(params.tableId).data ?? null;

  const styles = useStyles2(getStyles);

  const changeFilter = useCallback(
    (changedFilter?: MetricsQueryFilter) => {
      changeMetricsQueryParams({ filter: { ...params.filter, nonAggregated: changedFilter } });
    },
    [params.filter, changeMetricsQueryParams]
  );

  const filterEditorStyles = useFilterEditorStyles();

  return (
    // For now useCurrentTableMetadata is only used in FilterEditor.
    // TODO OMUI5-526: use it in other components as well.
    <CurrentTableMetadataProvider tableMetadata={tableMetadata}>
      <FieldSet>
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
                changeMetricsQueryParams({
                  affinityId: applicationOption?.value ?? ('' as AffinityId),
                  tableId: '',
                  agentsAndGroups: [],
                  columns: [],
                  groupBy: [],
                  orderBy: [],
                  parmas: [],
                  filter: {},
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
              // FYI: if we use `value={params.tableId}` instead of value={params.tableId || null},
              // then when `params.tableId` is changed from some real table id to `''` empty string,
              // the select field might still falsely visually show previously selected table name.
              value={params.tableId || null}
              onChange={(tableOption) => {
                changeMetricsQueryParams({
                  tableId: tableOption?.value ?? '',
                  columns: [],
                  groupBy: [],
                  orderBy: [],
                  parmas: [],
                  filter: {},
                });
              }}
              disabled={!params.affinityId}
              isClearable
              isSearchable
            />
          </Field>
        </InlineFieldRow>

        <ManagedSystemsSelector
          affinityId={params.affinityId}
          agentsAndGroups={params.agentsAndGroups}
          changeMetricsQueryParams={changeMetricsQueryParams}
        />

        <GroupBySelector
          tableId={params.tableId}
          columns={params.columns}
          groupBy={params.groupBy}
          changeMetricsQueryParams={changeMetricsQueryParams}
        />

        <DisplayAttributeSelector
          tableId={params.tableId}
          columns={params.columns}
          groupBy={params.groupBy}
          history={params.history}
          isVariableQueryEditor={isVariableQueryEditor}
          changeMetricsQueryParams={changeMetricsQueryParams}
        />

        <CollapseWithInfoIcon
          label="Filters"
          title="Specify filters in the query"
          isOpen={isFiltersCollapseExpanded}
          testId={tid('query-editor.collapse.filters')}
          onToggle={() => setIsFiltersCollapseExpanded((v) => !v)}
        >
          <FilterEditor
            filter={params.filter.nonAggregated}
            changeFilter={changeFilter}
            NoFiltersMessage={NoFiltersMessage}
            ClauseEditor={ClauseEditor}
            ConnectorLabel={ConnectorLabel}
            styles={filterEditorStyles}
          />
        </CollapseWithInfoIcon>

        <SystemParmaForm
          params={params.parmas}
          changeMetricsQueryParams={changeMetricsQueryParams}
          disabled={!params.tableId}
        />

        <OrderBySelector
          tableId={params.tableId}
          orderBy={params.orderBy}
          changeMetricsQueryParams={changeMetricsQueryParams}
          disabled={params.groupBy.length > 0}
          className={styles.orderByField}
        />

        <InlineFieldRow className={styles.rowLimitAndHistoryFieldRow}>
          <Field
            label="Get near-term history data"
            className={styles.historyField}
            data-testid={tid('query-editor.field.history-data')}
          >
            <InlineSwitch
              label="Use grafana time picker to select time range"
              value={params.history}
              onChange={(e) => {
                const newParams: Partial<MetricsQueryParams> = { history: e.currentTarget.checked };
                // This set also exists in the backend, please update both :)
                // https://git.rocketsoftware.com/projects/FAL/repos/falcon/browse/apps/grafana-plugin/pkg/datasource/infrastructure/itm_provider/cms_sql/non_itm_history_tables.go?at=5480e46c1aaf3b1bafdd60d0a3179a2946de2d45#12
                const NON_ITM_HISTORY_TABLES = new Set(['HISTTHRD', 'ZCDETL', 'ATFSUMS', 'CICSODV']);
                if (NON_ITM_HISTORY_TABLES.has(params.tableId)) {
                  changeMetricsQueryParams(newParams);
                  return;
                }
                if (!e.currentTarget.checked) {
                  newParams.columns = params.columns.filter(({ id }) => id !== writetimeColumnMetadata.id);
                } else if (!params.groupBy.length) {
                  newParams.columns = [...params.columns, { id: writetimeColumnMetadata.id }];
                }
                changeMetricsQueryParams(newParams);
              }}
              showLabel
              transparent
              className={styles.historySwitch}
            />
          </Field>
        </InlineFieldRow>
      </FieldSet>
    </CurrentTableMetadataProvider>
  );
}
