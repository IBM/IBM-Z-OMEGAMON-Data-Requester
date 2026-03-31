import { Select, MultiSelect, Field } from '@grafana/ui';
import { ColumnMetadata, writetimeColumnMetadata } from 'public-domain';
import React, { useMemo, memo } from 'react';

import { tid } from 'datasource/components';
import { MetricsQueryColumn, MetricsQueryParams } from 'datasource/domain';
import { countColumnDisplayName } from 'datasource/features/formatting/format';
import { useTableMetadata } from 'datasource/features/metadata';

import { EnumedColumnAggregationWarning } from './EnumedColumnAggregationWarning';
import { SelectableFormOption, FormOptionsResult, getFormOptionsResult } from './formOptionsHooks';

function stringifyMetricsQueryColumn({ id, aggregationFunction }: MetricsQueryColumn): string {
  return `${id}${aggregationFunction ? `:${aggregationFunction}` : ''}`;
}

type SelectableColumnOption = SelectableFormOption & { columnObject: MetricsQueryColumn };

function getColumnOptions(column: ColumnMetadata, groupByColumns: string[]): SelectableColumnOption[] {
  if (groupByColumns.length === 0 || groupByColumns.includes(column.id)) {
    const columnObject = {
      id: column.id,
      // no aggregationFunction
    };
    return [
      {
        label: column.name,
        value: stringifyMetricsQueryColumn(columnObject),
        description: column.description,
        columnObject,
      },
    ];
  }

  if (column.type === 'string') {
    return [];
  }

  const allowedFunctions =
    column.type === 'itmTimestamp' ? (['MIN', 'MAX'] as const) : (['MIN', 'MAX', 'AVG', 'SUM'] as const);

  return allowedFunctions.map((func) => {
    const columnObject = {
      id: column.id,
      aggregationFunction: func,
    };
    return {
      label: `${column.name} (${func})`,
      value: stringifyMetricsQueryColumn(columnObject),
      description: column.description,
      columnObject,
    };
  });
}

/** Returns list of column options for UI column list selector.
 * It handles aggregation functions based on groupByColumns argument.
 *
 * Since react-select use shallow comparison of value properties,
 * we cannot use objects in the 'value' field. Doing that will
 * break UI in cases if options have to be regenerated or if previosly
 * stored values should be restored.
 * Thus, we store actual value object in 'valueObject' field and string
 * representation of this object in 'value' field. This way react-select
 * compares strings so it's OK to pass different options objects.
 *
 * @param applicationCode Application code of the table to take column options for
 * @param tableId ID of the table (attribute group) to take column options for
 * @param groupByColumns List of column ids query is grouped on.
 * Pass an empty array if there is no group by statement in the query
 */
function useSelectableColumnOptions(
  tableId: string,
  groupByColumns: string[],
  history: boolean
): FormOptionsResult<SelectableColumnOption> {
  const tableMetadataResult = useTableMetadata(tableId);
  const columnOptions = useMemo(() => {
    if (!tableMetadataResult.data) {
      return undefined;
    }
    const options = Object.values(
      history
        ? { ...tableMetadataResult.data.columns, [writetimeColumnMetadata.id]: writetimeColumnMetadata }
        : tableMetadataResult.data.columns
    ).reduce((acc, v) => {
      acc.push(...getColumnOptions(v, groupByColumns));
      return acc;
    }, [] as SelectableColumnOption[]);

    if (groupByColumns.length > 0) {
      // COUNT(*) syntax is not supported by CMS SQL. We will use COUNT(ORIGINNODE)
      // since attribute selection doesn't make any difference
      const countColumnObject: MetricsQueryColumn = {
        id: 'ORIGINNODE',
        aggregationFunction: 'COUNT',
      };
      options.unshift({
        label: countColumnDisplayName,
        value: stringifyMetricsQueryColumn(countColumnObject),
        description: 'SQL representation is COUNT(*)',
        columnObject: countColumnObject,
      });
    }

    return options;
  }, [tableMetadataResult.data, groupByColumns, history]);

  const result = getFormOptionsResult(tableMetadataResult, columnOptions);
  return result;
}

type DisplayAttributeSelectorProps = Pick<MetricsQueryParams, 'columns' | 'groupBy' | 'tableId' | 'history'> & {
  isVariableQueryEditor: boolean;
  changeMetricsQueryParams: (changedParams: Partial<MetricsQueryParams>) => void;
};

export const DisplayAttributeSelector = memo(
  ({
    tableId,
    columns,
    groupBy,
    history,
    isVariableQueryEditor,
    changeMetricsQueryParams,
  }: DisplayAttributeSelectorProps) => {
    const selectableColumnOptionsResult = useSelectableColumnOptions(tableId, groupBy, history);

    return (
      <>
        <Field label="Display attribute names" data-testid={tid('query-editor.field.display-attr-names')}>
          {isVariableQueryEditor ? (
            <Select
              isLoading={selectableColumnOptionsResult.isFetching}
              options={selectableColumnOptionsResult.data}
              value={columns[0] ? stringifyMetricsQueryColumn(columns[0]) : null}
              onChange={(rawOption) => {
                const option = rawOption as SelectableColumnOption;
                changeMetricsQueryParams({
                  columns: option ? [option.columnObject] : [],
                });
              }}
              disabled={!tableId}
              isClearable
              isSearchable
              closeMenuOnSelect
            />
          ) : (
            <MultiSelect
              isLoading={selectableColumnOptionsResult.isFetching}
              options={selectableColumnOptionsResult.data}
              value={columns.map((column) => stringifyMetricsQueryColumn(column))}
              onChange={(rawOptions) =>
                changeMetricsQueryParams({
                  columns: (rawOptions as SelectableColumnOption[]).map((o) => o.columnObject || { id: o.value }),
                })
              }
              disabled={!tableId}
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              className={tid('query-editor.collapse.display-attr-names.multi-select')}
            />
          )}
        </Field>
        <EnumedColumnAggregationWarning tableId={tableId} columns={columns} />
      </>
    );
  }
);
DisplayAttributeSelector.displayName = 'DisplayAttributeSelector';
