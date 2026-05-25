/**
 * TLSClientAuth component - inlined from @grafana/plugin-ui v0.10.10
 * Source: https://unpkg.com/@grafana/plugin-ui@0.10.10/dist/esm/components/ConfigEditor/Auth/tls/TLSClientAuth.js
 * License: Apache-2.0
 */

import { cx } from '@emotion/css';
import { InlineField, Input, SecretTextArea } from '@grafana/ui';
import React from 'react';

import { useCommonStyles } from './auth-styles';
import { TLSSettingsSection } from './TLSSettingsSection';

// No-op function for readOnly mode to satisfy TypeScript and ESLint
const noop = () => {
  // Intentionally empty - used to disable functionality in readOnly mode
};

interface TLSClientAuthProps {
  enabled: boolean;
  serverName: string;
  clientCertificateConfigured: boolean;
  clientKeyConfigured: boolean;
  onToggle: (enabled: boolean) => void;
  onServerNameChange: (serverName: string) => void;
  onClientCertificateChange: (certificate: string) => void;
  onClientKeyChange: (key: string) => void;
  onClientCertificateReset: () => void;
  onClientKeyReset: () => void;
  tooltips?: {
    serverNameLabel?: string;
    certificateLabel?: string;
    keyLabel?: string;
  };
  readOnly?: boolean;
}

export const TLSClientAuth = ({
  enabled,
  serverName,
  clientCertificateConfigured,
  clientKeyConfigured,
  onToggle,
  onServerNameChange,
  onClientCertificateChange,
  onClientKeyChange,
  onClientCertificateReset,
  onClientKeyReset,
  tooltips,
  readOnly,
}: TLSClientAuthProps) => {
  const commonStyles = useCommonStyles();

  return (
    <TLSSettingsSection
      enabled={enabled}
      label="TLS Client Authentication"
      tooltipText="Validate using TLS client authentication, in which the server authenticates the client"
      onToggle={(newEnabled) => onToggle(newEnabled)}
      readOnly={readOnly}
    >
      <InlineField
        label="ServerName"
        labelWidth={24}
        tooltip={tooltips?.serverNameLabel ?? 'A Servername is used to verify the hostname on the returned certificate'}
        required={true}
        htmlFor="client-auth-servername-input"
        interactive={true}
        grow={true}
        className={commonStyles.inlineFieldNoMarginRight}
        disabled={readOnly}
      >
        <Input
          id="client-auth-servername-input"
          placeholder="domain.example.com"
          value={serverName}
          onChange={(e) => onServerNameChange(e.currentTarget.value)}
          required={true}
        />
      </InlineField>
      <InlineField
        label="Client Certificate"
        labelWidth={24}
        tooltip={
          tooltips?.certificateLabel ??
          'The client certificate can be generated from a Certificate Authority or be self-signed'
        }
        required={true}
        htmlFor="client-auth-client-certificate-input"
        interactive={true}
        grow={true}
        className={cx(commonStyles.inlineFieldNoMarginRight, commonStyles.inlineFieldWithSecret)}
        disabled={readOnly}
      >
        <SecretTextArea
          id="client-auth-client-certificate-input"
          isConfigured={clientCertificateConfigured}
          onChange={(e) => onClientCertificateChange(e.currentTarget.value)}
          onReset={readOnly ? noop : onClientCertificateReset}
          placeholder="Begins with --- BEGIN CERTIFICATE ---"
          rows={6}
          required={true}
        />
      </InlineField>
      <InlineField
        label="Client Key"
        labelWidth={24}
        tooltip={tooltips?.keyLabel ?? 'The client key can be generated from a Certificate Authority or be self-signed'}
        required={true}
        htmlFor="client-auth-client-key-input"
        interactive={true}
        grow={true}
        className={cx(commonStyles.inlineFieldNoMarginRight, commonStyles.inlineFieldWithSecret)}
        disabled={readOnly}
      >
        <SecretTextArea
          id="client-auth-client-key-input"
          isConfigured={clientKeyConfigured}
          onChange={(e) => onClientKeyChange(e.currentTarget.value)}
          onReset={readOnly ? noop : onClientKeyReset}
          placeholder="Begins with --- RSA PRIVATE KEY CERTIFICATE ---"
          rows={6}
          required={true}
        />
      </InlineField>
    </TLSSettingsSection>
  );
};
