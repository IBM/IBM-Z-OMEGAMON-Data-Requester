import styled from '@emotion/styled';
import { ConfigSection } from '@grafana/plugin-ui';
import { InlineField, Input } from '@grafana/ui';
import React, { ChangeEvent, useCallback } from 'react';

import { tid } from 'datasource/components';

import type { FalconDataSourceOptionsProps } from './FalconDataSourceOptionsProps';

const AdditionalSettingsEditorContainer = styled.div`
  /* Grafana uses "578" as a max-width size for all experimental ConfigEditor components containers 
  e.g. https://github.com/grafana/grafana-experimental/blob/main/src/ConfigEditor/Auth/Auth.tsx (line 37) */
  max-width: 578px;
  margin-top: 2em;
`;

export function AdditionalSettingsEditor({ options, onOptionsChange }: FalconDataSourceOptionsProps) {
  const onMetadataCacheTimeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const jsonData = {
        ...options.jsonData,
        metadataCacheTimeInSec: Number(event.target.value),
      };
      onOptionsChange({ ...options, jsonData });
    },
    [options, onOptionsChange]
  );

  const onTimeoutChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const jsonData = {
        ...options.jsonData,
        timeout: Number(event.target.value),
      };
      onOptionsChange({ ...options, jsonData });
    },
    [options, onOptionsChange]
  );

  const onUrlChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const adminUrl = event.target.value;

      onOptionsChange({ ...options, jsonData: { ...options.jsonData, adminUrl } });
    },
    [options, onOptionsChange]
  );

  return (
    <ConfigSection title="Additional settings" isCollapsible={true} isInitiallyOpen>
      <AdditionalSettingsEditorContainer>
        <InlineField
          label="Metadata cache timeout"
          tooltip="in seconds"
          data-testid={tid('config-editor.additional-configuration.field.cache-time')}
          /* Grafana uses "labelWidth={24}" for all experimental ConfigEditor components "InlideFields"
            e.g. https://github.com/grafana/grafana-experimental/blob/main/src/ConfigEditor/AdvancedSettings/AdvancedHttpSettings.tsx (lines 49, 65) */
          labelWidth={24}
          grow
        >
          <Input
            type="number"
            min="0"
            placeholder="Metadata cache timeout in seconds"
            aria-label="Metadata cache timeout in seconds"
            value={Math.floor(options.jsonData.metadataCacheTimeInSec)}
            onChange={onMetadataCacheTimeChange}
          />
        </InlineField>

        <InlineField
          label="HTTP request timeout"
          tooltip="in seconds"
          data-testid={tid('config-editor.additional-configuration.field.timeout')}
          labelWidth={24}
          grow
        >
          <Input
            type="number"
            min="0"
            placeholder="HTTP request timeout in seconds"
            aria-label="HTTP request timeout in seconds"
            value={options.jsonData.timeout}
            onChange={onTimeoutChange}
          />
        </InlineField>
        <InlineField
          label="Admin public URL"
          tooltip="URL for different UI communication: take action, etc"
          labelWidth={24}
          grow
        >
          <Input
            type="string"
            placeholder="URL of Admin UI, e.g.: https://my-org-admin-ui"
            aria-label="url"
            value={options.jsonData.adminUrl}
            onChange={onUrlChange}
          />
        </InlineField>
      </AdditionalSettingsEditorContainer>
    </ConfigSection>
  );
}
