import { css } from '@emotion/css';
import { TransformerUIProps, SelectableValue } from '@grafana/data';
import { useStyles2, FieldValidationMessage, InlineFieldRow, InlineField, Select, Input, Icon } from '@grafana/ui';
import React from 'react';

import type { WebhookTransformerOptions } from './index';

const getTransformerEditorStyles = () => {
  const section = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  });

  return {
    transformerFieldSection: section,
  };
};

const defaultWebhookTransformerOptions: WebhookTransformerOptions = {
  url: 'https://example.url.com',
  title: 'Send data',
  message: 'Hello World!',
};

export function WebhookTransformerEditor({
  input: frames,
  options: savedOptions,
  onChange,
}: TransformerUIProps<WebhookTransformerOptions>) {
  const styles = useStyles2(getTransformerEditorStyles);

  const options = {
    ...defaultWebhookTransformerOptions,
    ...savedOptions,
  };

  if (frames.length > 1) {
    return <FieldValidationMessage>Webhook works with a single frame.</FieldValidationMessage>;
  }

  if (!frames.length) {
    return <FieldValidationMessage>There is no data to transform</FieldValidationMessage>;
  }

  const fieldOptions =
    frames[0]?.fields.map((el) => {
      return {
        value: el.name,
        label: el.name,
      } as SelectableValue;
    }) || [];

  const isFieldEmpty = !options.field;

  return (
    <div>
      <InlineFieldRow className={styles.transformerFieldSection}>
        <InlineField label={'Field'} labelWidth={16} title="Field to add webhook">
          <Select
            value={options.field}
            options={fieldOptions}
            onChange={(v) => {
              onChange({ ...options, field: v.value });
            }}
            width={42}
            placeholder={'Select field to add webhook...'}
          />
        </InlineField>
        {isFieldEmpty && (
          <FieldValidationMessage horizontal>A field must be selected for the webhook to work</FieldValidationMessage>
        )}
      </InlineFieldRow>

      <InlineFieldRow className={styles.transformerFieldSection}>
        <InlineField label={'Link title'} labelWidth={16} title="Link Title">
          <Input
            value={options.title}
            onChange={(e) => {
              onChange({ ...options, title: e.currentTarget.value });
            }}
            width={42}
            placeholder={'Enter link title...'}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow className={styles.transformerFieldSection}>
        <InlineField label={'Webhook'} labelWidth={16} title="Webhook URL">
          <Input
            value={options.url}
            onChange={(e) => {
              onChange({ ...options, url: e.currentTarget.value });
            }}
            width={42}
            placeholder={'Enter webhook URL...'}
          />
        </InlineField>
        <Icon title="'Enter webhook URL to send data on link click" name="info-circle" />
      </InlineFieldRow>
      <InlineFieldRow className={styles.transformerFieldSection}>
        <InlineField label={'Message'} labelWidth={16} title="Message">
          <Input
            value={options.message}
            onChange={(e) => {
              onChange({ ...options, message: e.currentTarget.value });
            }}
            width={42}
            placeholder={'Enter message...'}
          />
        </InlineField>
      </InlineFieldRow>
    </div>
  );
}
