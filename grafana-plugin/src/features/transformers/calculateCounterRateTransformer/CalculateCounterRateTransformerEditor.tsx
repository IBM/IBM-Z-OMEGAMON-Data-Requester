import { css } from '@emotion/css';
import { DataFrame, FieldType, GrafanaTheme2, SelectableValue, TransformerUIProps } from '@grafana/data';
import { FieldValidationMessage, InlineField, InlineFieldRow, Input, Select, useStyles2 } from '@grafana/ui';
import { isEqual, uniqWith } from 'lodash';
import React from 'react';

import { GrafanaThemeProvider } from 'datasource/components';

import { fieldToSelectableValue } from 'features/transformers/common';
import { updateCalculateCounterRateTransformerOptionsToLatestVersion } from 'features/versioning/calculateCounterRateTransformer';

import { CalculateCounterRateTransformerOptions } from './CalculateCounterRateTransformerOptions';

function getCalculateCounterRateTransformerStyles(theme: GrafanaTheme2) {
  const container = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  });

  return {
    row: container,
  };
}

const inlineFieldLabelWidth = 20;

function framesToSelectableValues(frames: DataFrame[]): {
  timeSelectableValues?: Array<SelectableValue<string>>;
  numberSelectableValues?: Array<SelectableValue<string>>;
} {
  const fieldsInAllFrames = frames.flatMap(({ fields }) => fields);

  const allTimeSelectableValues = fieldsInAllFrames
    .filter(({ type }) => type === FieldType.time)
    .map(fieldToSelectableValue);
  const timeSelectableValues = uniqWith(allTimeSelectableValues, isEqual);

  const allNumberSelectableValues = fieldsInAllFrames
    .filter(({ type }) => type === FieldType.number)
    .map(fieldToSelectableValue);
  const numberSelectableValues = uniqWith(allNumberSelectableValues, isEqual);

  return { timeSelectableValues, numberSelectableValues };
}

export function CalculateCounterRateTransformerEditor({
  input: frames,
  options: optionsOfUnknownVersion,
  onChange: onOptionsChange,
}: TransformerUIProps<CalculateCounterRateTransformerOptions>) {
  const styles = useStyles2(getCalculateCounterRateTransformerStyles);
  let options: CalculateCounterRateTransformerOptions;
  try {
    options = updateCalculateCounterRateTransformerOptionsToLatestVersion(optionsOfUnknownVersion);
  } catch (error) {
    return (
      <FieldValidationMessage>{`Error while converting transformation options to latest version: ${
        error instanceof Error ? error.message : error
      }`}</FieldValidationMessage>
    );
  }

  const { timeSelectableValues, numberSelectableValues } = framesToSelectableValues(frames);

  const preselectedTimeColumn = timeSelectableValues?.[0];
  if (!options.timeColumn && preselectedTimeColumn) {
    onOptionsChange({ ...options, timeColumn: preselectedTimeColumn.value });
  }

  const sourceColumnBaseDisplayName =
    numberSelectableValues?.find(({ value }) => value === options.sourceColumn)?.label ?? 'column';

  return (
    <GrafanaThemeProvider>
      <div>
        <InlineFieldRow className={styles.row}>
          <InlineField
            label={'Source attribute'}
            labelWidth={inlineFieldLabelWidth}
            grow
            title="Field name to calculate counter rate column"
          >
            <Select
              value={options.sourceColumn}
              options={numberSelectableValues}
              onChange={(v) => {
                onOptionsChange({ ...options, sourceColumn: v.value });
              }}
              placeholder={'Select field name to calculate counter rate column'}
            />
          </InlineField>
        </InlineFieldRow>
        <InlineFieldRow className={styles.row}>
          <InlineField
            label={'Time attribute'}
            labelWidth={inlineFieldLabelWidth}
            grow
            title="Time field name to calculate counter rate column"
          >
            <Select
              value={options.timeColumn}
              options={timeSelectableValues}
              onChange={(v) => {
                onOptionsChange({ ...options, timeColumn: v.value });
              }}
              placeholder={'Select time field name to calculate counter rate column'}
            />
          </InlineField>
        </InlineFieldRow>
        <InlineFieldRow className={styles.row}>
          <InlineField
            label={'Counter rate field name'}
            labelWidth={inlineFieldLabelWidth}
            grow
            title="Field name for calculated counter rate column"
          >
            <Input
              value={options.counterRateColumnName ?? `Counter rate for '${sourceColumnBaseDisplayName}'`}
              onChange={(v: React.ChangeEvent<HTMLInputElement>) => {
                onOptionsChange({ ...options, counterRateColumnName: v.target.value });
              }}
              placeholder={'Enter field name for calculated counter rate column'}
            />
          </InlineField>
        </InlineFieldRow>
      </div>
    </GrafanaThemeProvider>
  );
}
