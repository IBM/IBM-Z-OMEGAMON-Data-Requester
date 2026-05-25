/**
 * SkipTLSVerification component - inlined from @grafana/plugin-ui v0.10.10
 * Source: https://unpkg.com/@grafana/plugin-ui@0.10.10/dist/esm/components/ConfigEditor/Auth/tls/SkipTLSVerification.js
 * License: Apache-2.0
 */

import React from 'react';

import { TLSSettingsSection } from './TLSSettingsSection';

interface SkipTLSVerificationProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  readOnly?: boolean;
}

export const SkipTLSVerification = ({ enabled, onToggle, readOnly }: SkipTLSVerificationProps) => {
  return (
    <TLSSettingsSection
      enabled={enabled}
      label="Skip TLS certificate validation"
      tooltipText="Skipping TLS certificate validation is not recommended unless absolutely necessary or for testing"
      onToggle={(newEnabled) => onToggle(newEnabled)}
      readOnly={readOnly}
    />
  );
};
