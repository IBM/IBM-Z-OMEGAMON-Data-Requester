import { InlineField, InlineSwitch } from '@grafana/ui';
import React from 'react';

import { FalconDataSourceOptionsProps } from './FalconDataSourceOptionsProps';

export function SecureSocksProxy({ options, onOptionsChange }: FalconDataSourceOptionsProps) {
  return (
    <InlineField
      label="Secure SOCKS Proxy"
      labelWidth={24}
      tooltip={
        <>
          Enable proxying the data source connection through the secure SOCKS proxy to a different network. See{' '}
          <a
            href="https://grafana.com/docs/grafana/next/setup-grafana/configure-grafana/proxy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Configure a data source connection proxy.
          </a>
        </>
      }
    >
      <InlineSwitch
        value={options.jsonData.enableSecureSocksProxy}
        onChange={(e) => {
          onOptionsChange({
            ...options,
            jsonData: {
              ...options.jsonData,
              enableSecureSocksProxy: e.currentTarget.checked,
            },
          });
        }}
      />
    </InlineField>
  );
}
