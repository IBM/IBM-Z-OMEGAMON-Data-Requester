import { MultiSelect, Field } from '@grafana/ui';
import { ColumnMetadata, writetimeColumnMetadata } from 'public-domain';
import React, { useMemo } from 'react';

import { tid } from 'datasource/components';
import {
  MetricsQueryOrderByItem,
  MetricsQueryParams,
  MetricsQueryColumn,
  ALLOWED_AGGREGATION_FUNCS,
  NON_ITM_HISTORY_TABLES,
} from 'datasource/domain';
import { useTableMetadata } from 'datasource/features/metadata';

import { SelectableFormOption, FormOptionsResult, getFormOptionsResult } from './formOptionsHooks';

function stringifyOrderByItem({ columnId, aggregationFunction, type }: MetricsQueryOrderByItem): string {
  const funcPart = aggregationFunction ? `${aggregationFunction}(${columnId})` : columnId;
  return `${funcPart}:${type}`;
}

function getOrderByItemLabel({ aggregationFunction, type }: MetricsQueryOrderByItem, { name }: ColumnMetadata): string {
  const funcPart = aggregationFunction ? `${aggregationFunction}(${name})` : name;
  return `${funcPart} (${type})`;
}

type OrderByOption = SelectableFormOption & { orderByItem: MetricsQueryOrderByItem };

function getOrderByOptions(
  columnMetadata: ColumnMetadata,
  currOrderBy: MetricsQueryOrderByItem[],
  isGroupByActive: boolean,
  selectedColumns: MetricsQueryColumn[]
): OrderByOption[] {
  const currentItem = currOrderBy.find(
    (orderByItem) => orderByItem.columnId === columnMetadata.id && orderByItem.aggregationFunction === undefined
  );

  const options: OrderByOption[] = [];

  if (isGroupByActive) {
    const selectedColumn = selectedColumns.find((col) => col.id === columnMetadata.id);
    if (selectedColumn?.aggregationFunction) {
      const ascItem: MetricsQueryOrderByItem = {
        columnId: columnMetadata.id,
        aggregationFunction: selectedColumn.aggregationFunction,
        type: 'ASC',
      };
      const descItem: MetricsQueryOrderByItem = {
        columnId: columnMetadata.id,
        aggregationFunction: selectedColumn.aggregationFunction,
        type: 'DESC',
      };

      const currentAggItem = currOrderBy.find(
        (orderByItem) =>
          orderByItem.columnId === columnMetadata.id &&
          orderByItem.aggregationFunction === selectedColumn.aggregationFunction
      );

      if (currentAggItem) {
        options.push({
          label: getOrderByItemLabel(currentAggItem, columnMetadata),
          value: stringifyOrderByItem(currentAggItem),
          description: columnMetadata.description,
          orderByItem: currentAggItem,
        });
      } else {
        options.push(
          {
            label: getOrderByItemLabel(ascItem, columnMetadata),
            value: stringifyOrderByItem(ascItem),
            description: columnMetadata.description,
            orderByItem: ascItem,
          },
          {
            label: getOrderByItemLabel(descItem, columnMetadata),
            value: stringifyOrderByItem(descItem),
            description: columnMetadata.description,
            orderByItem: descItem,
          }
        );
      }
    }

    if (selectedColumns.some((col) => col.id === columnMetadata.id)) {
      ALLOWED_AGGREGATION_FUNCS.forEach((func) => {
        if (selectedColumn?.aggregationFunction === func) {
          return;
        }

        const ascItem: MetricsQueryOrderByItem = {
          columnId: columnMetadata.id,
          aggregationFunction: func,
          type: 'ASC',
        };
        const descItem: MetricsQueryOrderByItem = {
          columnId: columnMetadata.id,
          aggregationFunction: func,
          type: 'DESC',
        };

        const currentFuncItem = currOrderBy.find(
          (orderByItem) => orderByItem.columnId === columnMetadata.id && orderByItem.aggregationFunction === func
        );

        if (currentFuncItem) {
          options.push({
            label: getOrderByItemLabel(currentFuncItem, columnMetadata),
            value: stringifyOrderByItem(currentFuncItem),
            description: columnMetadata.description,
            orderByItem: currentFuncItem,
          });
        } else {
          options.push(
            {
              label: getOrderByItemLabel(ascItem, columnMetadata),
              value: stringifyOrderByItem(ascItem),
              description: columnMetadata.description,
              orderByItem: ascItem,
            },
            {
              label: getOrderByItemLabel(descItem, columnMetadata),
              value: stringifyOrderByItem(descItem),
              description: columnMetadata.description,
              orderByItem: descItem,
            }
          );
        }
      });
    }
  } else {
    if (currentItem != null) {
      options.push({
        label: getOrderByItemLabel(currentItem, columnMetadata),
        value: stringifyOrderByItem(currentItem),
        description: columnMetadata.description,
        orderByItem: currentItem,
      });
    } else {
      const ascItem: MetricsQueryOrderByItem = { columnId: columnMetadata.id, type: 'ASC' };
      const descItem: MetricsQueryOrderByItem = { columnId: columnMetadata.id, type: 'DESC' };
      options.push(
        {
          label: getOrderByItemLabel(ascItem, columnMetadata),
          value: stringifyOrderByItem(ascItem),
          description: columnMetadata.description,
          orderByItem: ascItem,
        },
        {
          label: getOrderByItemLabel(descItem, columnMetadata),
          value: stringifyOrderByItem(descItem),
          description: columnMetadata.description,
          orderByItem: descItem,
        }
      );
    }
  }

  return options;
}

function useOrderByOptions(
  tableId: string,
  currOrderBy: MetricsQueryOrderByItem[],
  isGroupByActive: boolean,
  selectedColumns: MetricsQueryColumn[]
): FormOptionsResult<OrderByOption> {
  const tableMetadataResult = useTableMetadata(tableId);
  const orderByOptions = useMemo(() => {
    if (!tableMetadataResult.data) {
      return undefined; // In grafana UI options are defined as 'Array<Option<T>> | undefined'
    }
    return Object.values(
      history
        ? NON_ITM_HISTORY_TABLES.has(tableId)
          ? { ...tableMetadataResult.data.columns }
          : { ...tableMetadataResult.data.columns, [writetimeColumnMetadata.id]: writetimeColumnMetadata }
        : tableMetadataResult.data.columns
    )
      .map((columnMetadata) => getOrderByOptions(columnMetadata, currOrderBy, isGroupByActive, selectedColumns))
      .flat();
  }, [tableMetadataResult, tableId, currOrderBy, isGroupByActive, selectedColumns]);
  const result = getFormOptionsResult(tableMetadataResult, orderByOptions);
  return result;
}

type OrderBySelectorProps = Pick<MetricsQueryParams, 'tableId' | 'orderBy' | 'groupBy' | 'columns'> & {
  changeMetricsQueryParams: (changedParams: Partial<MetricsQueryParams>) => void;
  className?: string;
};

export function OrderBySelector({
  tableId,
  orderBy,
  groupBy,
  columns,
  changeMetricsQueryParams,
  className,
}: OrderBySelectorProps) {
  const isGroupByActive = groupBy.length > 0;
  const orderByOptionsResult = useOrderByOptions(tableId, orderBy, isGroupByActive, columns);
  return (
    <Field label="Order by" className={className} data-testid={tid('query-editor.field.order-by')}>
      <MultiSelect
        isLoading={orderByOptionsResult.isFetching}
        options={orderByOptionsResult.data}
        value={orderBy.map(stringifyOrderByItem)}
        onChange={(rawOptions) => {
          const options = rawOptions as OrderByOption[] | null;
          changeMetricsQueryParams({
            orderBy: (options ?? []).map((option) => option.orderByItem),
          });
        }}
        disabled={!orderByOptionsResult.data}
        isClearable
        isSearchable
        closeMenuOnSelect={false}
      />
    </Field>
  );
}
