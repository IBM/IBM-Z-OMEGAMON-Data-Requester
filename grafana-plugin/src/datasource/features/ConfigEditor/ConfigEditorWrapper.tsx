import { Alert, VerticalGroup } from '@grafana/ui';
import React from 'react';

import { GrafanaThemeProvider } from 'datasource/components';
import { useUpdateToLatestConfigVersion } from 'datasource/features/versioning/datasourceConfig';

import { ConfigEditor } from './ConfigEditor';
import { FalconDataSourceOptionsProps } from './FalconDataSourceOptionsProps';

export function ConfigEditorWrapper({
  onOptionsChange,
  options: possiblyCorruptedOptions,
}: FalconDataSourceOptionsProps) {
  const optionsUpdateInfo = useUpdateToLatestConfigVersion(possiblyCorruptedOptions, onOptionsChange);
  switch (optionsUpdateInfo.status) {
    case 'success':
      return (
        <GrafanaThemeProvider>
          {optionsUpdateInfo.isUpdated ? (
            // TODO: OMUI5-648 In most cases we only should require user to click "Apply & test" button
            // In this case severity should be "info".
            // We only should ask user to verify config (and use severity "warning") if we know we couldn't
            // update the config
            <Alert title="Configurations have been automatically updated to the latest version" severity="warning">
              Please verify the accuracy of all settings and save the updated configuration.
            </Alert>
          ) : null}
          <ConfigEditor options={optionsUpdateInfo.options} onOptionsChange={onOptionsChange} />
        </GrafanaThemeProvider>
      );
    case 'error':
      return (
        <Alert severity="error" title="Error occurred during options initialization">
          <VerticalGroup>
            <div>{optionsUpdateInfo.error}</div>
          </VerticalGroup>
        </Alert>
      );
  }
}
