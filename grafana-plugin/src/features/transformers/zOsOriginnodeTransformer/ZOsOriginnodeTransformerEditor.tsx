import { css } from '@emotion/css';
import { GrafanaTheme2, TransformerUIProps, SelectableValue } from '@grafana/data';
import { getDataSourceSrv } from '@grafana/runtime';
import { useStyles2, FieldValidationMessage, InlineFieldRow, InlineField, Select } from '@grafana/ui';
import React from 'react';

import { GrafanaThemeProvider } from 'datasource/components';

import { fieldToSelectableValue } from 'features/transformers/common';
import { updateZOsOriginnodeTransformerOptionsToLatestVersion } from 'features/versioning/zOsOriginnodeTransformer';

import { ZOsOriginnodeTransformerOptions } from './ZOsOriginnodeTransformerOptions';

const getZOsOriginnodeTransformerStyles = (theme: GrafanaTheme2) => {
  const container = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  });

  return {
    row: container,
  };
};

export function ZOsOriginnodeTransformerEditor({
  input: frames,
  options: optionsOfUnknownVersion,
  onChange: onOptionsChange,
}: TransformerUIProps<ZOsOriginnodeTransformerOptions>) {
  const styles = useStyles2(getZOsOriginnodeTransformerStyles);
  let options: ZOsOriginnodeTransformerOptions;
  try {
    options = updateZOsOriginnodeTransformerOptionsToLatestVersion(optionsOfUnknownVersion);
  } catch (error) {
    return (
      <FieldValidationMessage>{`Error while converting 'zOS origin node transformer' transformation options to latest version: ${
        error instanceof Error ? error.message : error
      }`}</FieldValidationMessage>
    );
  }

  if (frames.length > 1) {
    return <FieldValidationMessage>Add zOS agent originnode only works with a single frame.</FieldValidationMessage>;
  }

  if (!frames.length) {
    return <FieldValidationMessage>There is no data to transform.</FieldValidationMessage>;
  }

  const list = getDataSourceSrv().getList({ type: 'rocketsoftware-omegamon-datasource' });
  const datasourcesSelectableValues = list.map((datasource) => {
    return { value: datasource.uid, label: datasource.name } as SelectableValue;
  });

  const lparColumnSelectableValues = frames[0]?.fields.map(fieldToSelectableValue);

  return (
    <GrafanaThemeProvider>
      <div>
        <InlineFieldRow className={styles.row}>
          <InlineField
            label={'Datasource'}
            labelWidth={16}
            grow
            title="Select datasource which is used for actual query"
          >
            <Select
              value={options.datasourceUid}
              options={datasourcesSelectableValues}
              onChange={(v) => {
                onOptionsChange({ ...options, datasourceUid: v.value });
              }}
              placeholder={'Select datasource to get z/Os originnode'}
            />
          </InlineField>
        </InlineFieldRow>
        <InlineFieldRow className={styles.row}>
          <InlineField label={'LPAR'} labelWidth={16} grow title="Select column which contains LPAR name">
            <Select
              value={options.lparColumn}
              options={lparColumnSelectableValues}
              onChange={(v) => {
                onOptionsChange({ ...options, lparColumn: v.value });
              }}
              placeholder={'Select field with LPAR name'}
            />
          </InlineField>
        </InlineFieldRow>
      </div>
    </GrafanaThemeProvider>
  );
}
