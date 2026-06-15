import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { Field, FilterPill, useStyles2 } from '@grafana/ui';
import React, { useEffect, useMemo, memo } from 'react';

import { tid } from 'datasource/components';
import { TimeSeriesQueryParams } from 'datasource/domain';
import { useTableMetadata } from 'datasource/features/metadata';

const getStyles = (theme: GrafanaTheme2) => ({
  pillContainer: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
  }),
});

type TimeSeriesLabelsSelectorProps = Pick<TimeSeriesQueryParams, 'tableId' | 'labels'> & {
  changeTimeSeriesQueryParams: (changedParams: Partial<TimeSeriesQueryParams>) => void;
};

/**
 * Labels selector for Time-series tab using FilterPill components.
 * Only displays string-type columns from table metadata.
 * All labels are selected by default when table changes.
 */
export const TimeSeriesLabelsSelector = memo(
  ({ tableId, labels, changeTimeSeriesQueryParams }: TimeSeriesLabelsSelectorProps) => {
    const tableMetadataResult = useTableMetadata(tableId);
    const styles = useStyles2(getStyles);

    // Only show string-type columns
    const stringColumnOptions = useMemo(() => {
      if (!tableMetadataResult.data) {
        return [];
      }
      return Object.values(tableMetadataResult.data.columns)
        .filter((col) => col.timeSeriesRole === 'label' || col.timeSeriesRole === 'originnode')
        .map((col) => ({
          id: col.id,
          label: col.name,
          description: col.description,
        }));
    }, [tableMetadataResult.data]);

    // Select all labels by default when table metadata loads and no labels are selected yet
    useEffect(() => {
      if (stringColumnOptions.length > 0 && labels.length === 0) {
        changeTimeSeriesQueryParams({ labels: stringColumnOptions.map((col) => col.id) });
      }
    }, [stringColumnOptions]); // eslint-disable-line react-hooks/exhaustive-deps

    const handlePillClick = (columnId: string) => {
      const isSelected = labels.includes(columnId);
      const newLabels = isSelected ? labels.filter((id) => id !== columnId) : [...labels, columnId];
      changeTimeSeriesQueryParams({ labels: newLabels });
    };

    return (
      <Field label="Labels" data-testid={tid('query-editor.time-series.field.labels')}>
        <div className={styles.pillContainer}>
          {stringColumnOptions.map((option) => {
            const isSelected = labels.includes(option.id);
            return (
              <FilterPill
                key={option.id}
                label={option.label}
                selected={isSelected}
                onClick={() => handlePillClick(option.id)}
              />
            );
          })}
          {tableId && tableMetadataResult.data !== undefined && stringColumnOptions.length === 0 && (
            <span>No labels to display</span>
          )}
          {!tableId && <span>Select an attribute group first</span>}
        </div>
      </Field>
    );
  }
);

TimeSeriesLabelsSelector.displayName = 'TimeSeriesLabelsSelector';
