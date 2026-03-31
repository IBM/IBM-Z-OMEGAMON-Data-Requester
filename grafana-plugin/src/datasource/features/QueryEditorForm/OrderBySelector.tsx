import { MultiSelect, Field } from '@grafana/ui';
import { ColumnMetadata } from 'public-domain';
import React, { useMemo } from 'react';

import { tid } from 'datasource/components';
import { MetricsQueryOrderByItem, MetricsQueryParams } from 'datasource/domain';
import { useTableMetadata } from 'datasource/features/metadata';

import { SelectableFormOption, FormOptionsResult, getFormOptionsResult } from './formOptionsHooks';

function stringifyOrderByItem({ columnId, type }: MetricsQueryOrderByItem): string {
  return `${columnId}:${type}`;
}

function getOrderByItemLabel({ type }: MetricsQueryOrderByItem, { name }: ColumnMetadata): string {
  return `${name} (${type})`;
}

type OrderByOption = SelectableFormOption & { orderByItem: MetricsQueryOrderByItem };

function getOrderByOptions(columnMetadata: ColumnMetadata, currOrderBy: MetricsQueryOrderByItem[]): OrderByOption[] {
  const currentItem = currOrderBy.find((orderByItem) => orderByItem.columnId === columnMetadata.id);
  if (currentItem != null) {
    // This column already listed in order by. Thus, we should only provide one option for it
    // Note, we cannot return an empty array here, since Multiselect needs this item in order to
    // display it as selected
    return [
      {
        label: getOrderByItemLabel(currentItem, columnMetadata),
        value: stringifyOrderByItem(currentItem),
        description: columnMetadata.description,
        orderByItem: currentItem,
      },
    ];
  }
  const ascItem: MetricsQueryOrderByItem = { columnId: columnMetadata.id, type: 'ASC' };
  const descItem: MetricsQueryOrderByItem = { columnId: columnMetadata.id, type: 'DESC' };
  return [
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
    },
  ];
}

function useOrderByOptions(tableId: string, currOrderBy: MetricsQueryOrderByItem[]): FormOptionsResult<OrderByOption> {
  const tableMetadataResult = useTableMetadata(tableId);
  const orderByOptions = useMemo(() => {
    if (!tableMetadataResult.data) {
      return undefined; // In grafana UI options are defined as 'Array<Option<T>> | undefined'
    }
    return Object.values(tableMetadataResult.data.columns)
      .map((columnMetadata) => getOrderByOptions(columnMetadata, currOrderBy))
      .flat();
  }, [tableMetadataResult, currOrderBy]);
  const result = getFormOptionsResult(tableMetadataResult, orderByOptions);
  return result;
}

type OrderBySelectorProps = Pick<MetricsQueryParams, 'tableId' | 'orderBy'> & {
  changeMetricsQueryParams: (changedParams: Partial<MetricsQueryParams>) => void;
  disabled: boolean;
  className?: string;
};

export function OrderBySelector({
  tableId,
  orderBy,
  changeMetricsQueryParams,
  disabled,
  className,
}: OrderBySelectorProps) {
  const orderByOptionsResult = useOrderByOptions(tableId, orderBy);
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
        disabled={disabled || !orderByOptionsResult.data}
        isClearable
        isSearchable
        closeMenuOnSelect={false}
      />
    </Field>
  );
}
