import { css } from '@emotion/css';
import { FieldType, GrafanaTheme2, TransformerUIProps } from '@grafana/data';
import { Alert, FieldValidationMessage, InlineField, InlineFieldRow, Input, Select, useStyles2 } from '@grafana/ui';
import { every, filter, isEmpty, some, uniqBy } from 'lodash';
import React from 'react';

import { GrafanaThemeProvider } from 'datasource/components';

import { fieldToSelectableValue } from 'features/transformers/common';
import { updateCalculateDeltaTransformerOptionsToLatestVersion } from 'features/versioning/calculateDeltaTransformer';

import { CalculateDeltaTransformerOptions } from './CalculateDeltaTransformerOptions';

function getCalculateDeltaTransformerStyles(theme: GrafanaTheme2) {
  const container = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  });

  const alertRow = css({
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0, 0.5, 0.5, 0),
  });

  const alert = css({
    marginBottom: 0,
  });

  return {
    row: container,
    alertRow,
    alert,
  };
}

const inlineFieldLabelWidth = 20;

export function CalculateDeltaTransformerEditor({
  input: frames,
  options: optionsOfUnknownVersion,
  onChange: onOptionsChange,
}: TransformerUIProps<CalculateDeltaTransformerOptions>) {
  const styles = useStyles2(getCalculateDeltaTransformerStyles);
  let options: CalculateDeltaTransformerOptions;
  try {
    options = updateCalculateDeltaTransformerOptionsToLatestVersion(optionsOfUnknownVersion);
  } catch (error) {
    return (
      <FieldValidationMessage>{`Error while converting 'Calculate delta' transformation options to latest version: ${
        error instanceof Error ? error.message : error
      }`}</FieldValidationMessage>
    );
  }

  const framesWithFields = filter(frames, (frame) => !isEmpty(frame.fields));
  // Show error only when we have frames with fields and not all of those frames have a time field
  const showTimeFieldError =
    !isEmpty(framesWithFields) &&
    !every(framesWithFields, (frame) => some(frame.fields, (field) => field.type === FieldType.time));

  const numberFields = frames.flatMap(({ fields }) => fields).filter(({ type }) => type === FieldType.number);
  const uniqueNumberFields = uniqBy(numberFields, (field) => field.name);
  const columnSelectableValues = uniqueNumberFields.map(fieldToSelectableValue);

  const selectedFieldBaseDisplayName =
    columnSelectableValues.find((selectableValue) => selectableValue.value === options.sourceColumn)?.label ?? 'column';

  return (
    <GrafanaThemeProvider>
      <div>
        {showTimeFieldError && (
          <div className={styles.alertRow}>
            <Alert
              className={styles.alert}
              title="Not every frame has a time field, 'Calculate delta' transformation is only supported for timeseries"
            />
          </div>
        )}

        <InlineFieldRow className={styles.row}>
          <InlineField
            label={'Source attribute'}
            labelWidth={inlineFieldLabelWidth}
            grow
            title="Attribute to calculate delta from"
          >
            <Select
              value={options.sourceColumn}
              options={columnSelectableValues}
              onChange={(v) => {
                onOptionsChange({ ...options, sourceColumn: v.value });
              }}
              placeholder={'Select attribute to calculate delta from'}
            />
          </InlineField>
        </InlineFieldRow>
        <InlineFieldRow className={styles.row}>
          <InlineField
            label={'Difference field name'}
            labelWidth={inlineFieldLabelWidth}
            grow
            title="Field name for calculated delta column"
          >
            <Input
              value={options.deltaColumnName ?? `Difference of '${selectedFieldBaseDisplayName}'`}
              onChange={(v: React.ChangeEvent<HTMLInputElement>) => {
                onOptionsChange({ ...options, deltaColumnName: v.target.value });
              }}
              placeholder={'Enter field name for delta column'}
            />
          </InlineField>
        </InlineFieldRow>
      </div>
    </GrafanaThemeProvider>
  );
}
