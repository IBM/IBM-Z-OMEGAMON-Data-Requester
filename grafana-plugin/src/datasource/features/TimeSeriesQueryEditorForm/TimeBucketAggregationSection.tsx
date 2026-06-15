import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { Field, FieldValidationMessage, InlineFieldRow, Input, RadioButtonGroup, useStyles2 } from '@grafana/ui';
import React, { useCallback, useState } from 'react';

import { tid } from 'datasource/components';
import { AGGREGATION_INTERVAL, TimeBucketAggregation, TimeSeriesQueryParams } from 'datasource/domain';

const getStyles = (theme: GrafanaTheme2) => ({
  aggregationFieldRow: css({
    columnGap: theme.spacing(2),
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
  aggregationIntervalMinutes: number;
  changeTimeSeriesQueryParams: (changedParams: Partial<TimeSeriesQueryParams>) => void;
  disabled?: boolean;
}

/** Maps a numeric aggregationIntervalMinutes value to the corresponding radio button option */
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

/** Maps a radio button option to its numeric aggregationIntervalMinutes value */
function toIntervalMinutes(option: TimeBucketAggregation): number {
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
  aggregationIntervalMinutes,
  changeTimeSeriesQueryParams,
  disabled = false,
}: TimeBucketAggregationSectionProps) {
  const styles = useStyles2(getStyles);

  const selectedOption = toSelectedOption(aggregationIntervalMinutes);

  const [isTouched, setIsTouched] = useState(true);

  const isCustom = selectedOption === 'custom';

  const handleAggregationChange = useCallback(
    (value: TimeBucketAggregation) => {
      setIsTouched(false);
      changeTimeSeriesQueryParams({ aggregationIntervalMinutes: toIntervalMinutes(value) });
    },
    [changeTimeSeriesQueryParams]
  );

  const handleCustomIntervalChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const minutes = parseInt(e.target.value, 10);
      changeTimeSeriesQueryParams({
        aggregationIntervalMinutes: isNaN(minutes) || minutes <= 0 ? AGGREGATION_INTERVAL.CUSTOM_UNSET : minutes,
      });
    },
    [changeTimeSeriesQueryParams]
  );

  const customInputValue = aggregationIntervalMinutes > 0 ? aggregationIntervalMinutes : '';
  const isCustomInvalid = isCustom && isTouched && aggregationIntervalMinutes <= 0;

  return (
    <div data-testid={tid('query-editor.time-series.time-bucket-aggregation')}>
      <InlineFieldRow className={styles.aggregationFieldRow}>
        <Field
          label="Time bucket aggregation"
          data-testid={tid('query-editor.time-series.time-bucket-aggregation-custom')}
        >
          <RadioButtonGroup
            options={timeBucketOptions}
            value={selectedOption}
            onChange={handleAggregationChange}
            disabled={disabled}
          />
        </Field>
        {isCustom && (
          <Field label="Custom interval (min)" invalid={isCustomInvalid}>
            <div>
              <Input
                type="number"
                min={1}
                autoFocus={isCustom}
                placeholder="Enter interval in minutes"
                value={customInputValue}
                onChange={handleCustomIntervalChange}
                onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                onBlur={() => setIsTouched(true)}
                invalid={isCustomInvalid}
                data-testid={tid('query-editor.time-series.custom-aggregation-interval')}
              />
              {isCustomInvalid && <FieldValidationMessage>Interval is required</FieldValidationMessage>}
            </div>
          </Field>
        )}
      </InlineFieldRow>
    </div>
  );
}
