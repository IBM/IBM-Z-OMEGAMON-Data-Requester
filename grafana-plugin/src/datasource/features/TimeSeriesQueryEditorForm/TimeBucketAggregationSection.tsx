import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { Field, FieldValidationMessage, Input, RadioButtonGroup, useStyles2 } from '@grafana/ui';
import React, { useCallback } from 'react';

import { tid } from 'datasource/components';
import { AGGREGATION_INTERVAL, TimeBucketAggregation, TimeSeriesQueryParams } from 'datasource/domain';

const getStyles = (theme: GrafanaTheme2) => ({
  container: css({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }),
  title: css({
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(1),
  }),
  customInput: css({
    maxWidth: '200px',
    marginTop: theme.spacing(1),
  }),
});

type TimeBucketAggregationOption = {
  label: string;
  value: TimeBucketAggregation;
};

/** Time bucket aggregation radio button options */
const timeBucketOptions: TimeBucketAggregationOption[] = [
  { label: 'No bucket aggregation', value: 'none' },
  { label: 'Automatic', value: 'automatic' },
  { label: 'Hourly', value: 'hourly' },
  { label: 'Daily', value: 'daily' },
  { label: 'Custom', value: 'custom' },
];

interface TimeBucketAggregationSectionProps {
  aggregationIntervalMs: number;
  changeTimeSeriesQueryParams: (changedParams: Partial<TimeSeriesQueryParams>) => void;
}

/** Maps a numeric aggregationIntervalMs value to the corresponding radio button option */
function toSelectedOption(value: number): TimeBucketAggregation {
  switch (value) {
    case AGGREGATION_INTERVAL.NONE:
      return 'none';
    case AGGREGATION_INTERVAL.AUTOMATIC:
      return 'automatic';
    case AGGREGATION_INTERVAL.HOURLY:
      return 'hourly';
    case AGGREGATION_INTERVAL.DAILY:
      return 'daily';
    default:
      return 'custom';
  }
}

/** Maps a radio button option to its numeric aggregationIntervalMs value */
function toIntervalMs(option: TimeBucketAggregation): number {
  switch (option) {
    case 'none':
      return AGGREGATION_INTERVAL.NONE;
    case 'automatic':
      return AGGREGATION_INTERVAL.AUTOMATIC;
    case 'hourly':
      return AGGREGATION_INTERVAL.HOURLY;
    case 'daily':
      return AGGREGATION_INTERVAL.DAILY;
    case 'custom':
      return AGGREGATION_INTERVAL.CUSTOM_UNSET;
  }
}

/**
 * Time bucket aggregation section with radio buttons.
 * Always interactive regardless of Labels selection.
 * "Automatic" is selected by default for new queries.
 */
export function TimeBucketAggregationSection({
  aggregationIntervalMs,
  changeTimeSeriesQueryParams,
}: TimeBucketAggregationSectionProps) {
  const styles = useStyles2(getStyles);

  const selectedOption = toSelectedOption(aggregationIntervalMs);
  const isCustom = selectedOption === 'custom';

  const handleAggregationChange = useCallback(
    (value: TimeBucketAggregation) => {
      changeTimeSeriesQueryParams({ aggregationIntervalMs: toIntervalMs(value) });
    },
    [changeTimeSeriesQueryParams]
  );

  const handleCustomIntervalChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      changeTimeSeriesQueryParams({
        aggregationIntervalMs: isNaN(value) || value <= 0 ? AGGREGATION_INTERVAL.CUSTOM_UNSET : value,
      });
    },
    [changeTimeSeriesQueryParams]
  );

  const customInputValue = aggregationIntervalMs > 0 ? aggregationIntervalMs : '';
  const isCustomInvalid = isCustom && aggregationIntervalMs <= 0;

  return (
    <div className={styles.container} data-testid={tid('query-editor.time-series.time-bucket-aggregation')}>
      <div className={styles.title}>Time bucket aggregation</div>
      <RadioButtonGroup options={timeBucketOptions} value={selectedOption} onChange={handleAggregationChange} />
      {isCustom && (
        <Field label="Custom interval (ms)" className={styles.customInput} invalid={isCustomInvalid}>
          <Input
            type="number"
            min={1}
            placeholder="Enter interval in milliseconds"
            value={customInputValue}
            onChange={handleCustomIntervalChange}
            invalid={isCustomInvalid}
            data-testid={tid('query-editor.time-series.custom-aggregation-interval')}
          />
        </Field>
      )}
      {isCustomInvalid && (
        <FieldValidationMessage>Please enter a valid interval greater than 0 ms</FieldValidationMessage>
      )}
    </div>
  );
}
