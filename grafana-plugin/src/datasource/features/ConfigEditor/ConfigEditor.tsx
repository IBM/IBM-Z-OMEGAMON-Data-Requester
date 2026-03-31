import { Auth, ConnectionSettings } from '@grafana/plugin-ui';
import { Divider } from '@grafana/ui';
import React from 'react';

import { AdditionalSettingsEditor } from './AdditionalSettingsEditor';
import type { FalconDataSourceOptionsProps } from './FalconDataSourceOptionsProps';
import { useConvertedLegacyAuthProps } from './useConvertedLegacyAuthProps';

export function ConfigEditor({ onOptionsChange, options }: FalconDataSourceOptionsProps) {
  const convertedProps = useConvertedLegacyAuthProps({ options, onOptionsChange });

  return (
    <>
      <ConnectionSettings
        config={options}
        onChange={onOptionsChange}
        urlLabel="Gateway address"
        urlPlaceholder="https://my-org-gateway:7554"
        urlTooltip="URI of Gateway with port included, e.g.: https://my-org-gateway:1922"
      />
      <Divider spacing={3} />
      <Auth {...convertedProps} />
      <Divider spacing={3} />

      <AdditionalSettingsEditor options={options} onOptionsChange={onOptionsChange} />
    </>
  );
}
