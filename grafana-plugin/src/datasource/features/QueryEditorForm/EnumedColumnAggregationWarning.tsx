import { css } from '@emotion/css';
import { Alert, VerticalGroup } from '@grafana/ui';
import _ from 'lodash';
import { ColumnMetadata } from 'public-domain';
import React, { useMemo } from 'react';

import { MetricsQueryColumn } from 'datasource/domain';
import { useTableMetadata } from 'datasource/features/metadata';

function useEnumedColumnsMetadata(tableId: string, currentColumnsSelection: MetricsQueryColumn[]): ColumnMetadata[] {
  const tableMetadataResult = useTableMetadata(tableId);
  const enumedColumnsMap = useMemo(() => {
    if (!tableMetadataResult.data) {
      return [];
    }
    return currentColumnsSelection.reduce(
      (acc, selectedColumn) => {
        const columnMetadata = tableMetadataResult.data.columns[selectedColumn.id];
        if (
          selectedColumn.aggregationFunction &&
          columnMetadata?.type === 'number' &&
          columnMetadata?.enums &&
          !_.isEmpty(columnMetadata.enums)
        ) {
          acc[columnMetadata.id] = columnMetadata;
        }
        return acc;
      },
      {} as Record<string, ColumnMetadata>
    );
  }, [tableMetadataResult.data, currentColumnsSelection]);
  return Object.values(enumedColumnsMap);
}

type ColumnEnumDescriptionProps = {
  columnMetadata: ColumnMetadata;
};

function ColumnEnumDescription({ columnMetadata }: ColumnEnumDescriptionProps) {
  if (!columnMetadata.enums) {
    return null;
  }
  return (
    <div>
      <span
        className={css`
          font-weight: bold;
        `}
      >
        {columnMetadata.name} ({columnMetadata.id})
      </span>
      <ul
        className={css`
          padding-left: 2em;
        `}
      >
        {Object.entries(columnMetadata.enums).map(([value, name]) => (
          <li key={value}>
            {value}: {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

type EnumedColumnAggregationWarningProps = {
  tableId: string;
  columns: MetricsQueryColumn[];
};

export function EnumedColumnAggregationWarning({ tableId, columns }: EnumedColumnAggregationWarningProps) {
  const enumedColumnsMetadata = useEnumedColumnsMetadata(tableId, columns);
  if (enumedColumnsMetadata.length === 0) {
    return null;
  }
  return (
    <Alert severity="info" title="Possible aggregation data corruption">
      <VerticalGroup>
        <div>
          Some of the attributes selected have special values. Most likely, those values do not have any sense in
          aggregation queries and should be filtered out since result of aggregation can be corrupted by special values
          (e.g. N/A).
        </div>
        <div>Following attributes have special values:</div>
        {enumedColumnsMetadata.map((column) => (
          <ColumnEnumDescription key={column.id} columnMetadata={column} />
        ))}
      </VerticalGroup>
    </Alert>
  );
}
