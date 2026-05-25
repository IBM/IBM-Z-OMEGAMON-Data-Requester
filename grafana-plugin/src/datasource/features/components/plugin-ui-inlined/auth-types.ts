/**
 * Auth types - inlined from @grafana/plugin-ui to avoid internal package dependency
 * Source: https://github.com/grafana/plugin-ui/blob/main/src/components/ConfigEditor/Auth/types.ts
 * License: Apache-2.0
 */

import { type ReactElement } from 'react';

export enum AuthMethod {
  NoAuth = 'NoAuth',
  BasicAuth = 'BasicAuth',
  OAuthForward = 'OAuthForward',
  CrossSiteCredentials = 'CrossSiteCredentials',
}

export interface AuthMethodSelectOption {
  label?: string;
  description?: string;
}

export type CustomMethodId = `custom-${string}`;

export type CustomMethod = {
  id: CustomMethodId;
  label: string;
  description: string;
  component: ReactElement;
};

export type Header = {
  name: string;
  configured: boolean;
};

export type HeaderWithValue = Header & { value: string };

export type LocalHeader = HeaderWithValue & { id: string };

export interface BasicAuthConfig {
  user: string;
  passwordConfigured: boolean;
  onUserChange: (user: string) => void;
  onPasswordChange: (password: string) => void;
  onPasswordReset: () => void;
}

export interface TLSConfig {
  selfSignedCertificate: {
    enabled: boolean;
    certificateConfigured: boolean;
    onToggle: (enabled: boolean) => void;
    onCertificateChange: (certificate: string) => void;
    onCertificateReset: () => void;
  };
  TLSClientAuth: {
    enabled: boolean;
    serverName: string;
    clientCertificateConfigured: boolean;
    clientKeyConfigured: boolean;
    onToggle: (enabled: boolean) => void;
    onServerNameChange: (serverName: string) => void;
    onClientCertificateChange: (certificate: string) => void;
    onClientCertificateReset: () => void;
    onClientKeyChange: (key: string) => void;
    onClientKeyReset: () => void;
  };
  skipTLSVerification: {
    enabled: boolean;
    onToggle: (enabled: boolean) => void;
  };
}

export interface CustomHeadersConfig {
  headers: Header[];
  onChange: (headers: HeaderWithValue[]) => void;
}

export interface AuthProps {
  selectedMethod: AuthMethod | CustomMethodId;
  mostCommonMethod?: AuthMethod;
  visibleMethods?: Array<AuthMethod | CustomMethodId>;
  defaultOptionsOverrides?: Partial<Record<AuthMethod, AuthMethodSelectOption>>;
  customMethods?: CustomMethod[];
  onAuthMethodSelect: (method: AuthMethod | CustomMethodId) => void;
  basicAuth?: BasicAuthConfig;
  // TLS config properties are destructured in v0.10.10
  selfSignedCertificate: {
    enabled: boolean;
    certificateConfigured: boolean;
    onToggle: (enabled: boolean) => void;
    onCertificateChange: (certificate: string) => void;
    onCertificateReset: () => void;
  };
  TLSClientAuth: {
    enabled: boolean;
    serverName: string;
    clientCertificateConfigured: boolean;
    clientKeyConfigured: boolean;
    onToggle: (enabled: boolean) => void;
    onServerNameChange: (serverName: string) => void;
    onClientCertificateChange: (certificate: string) => void;
    onClientCertificateReset: () => void;
    onClientKeyChange: (key: string) => void;
    onClientKeyReset: () => void;
  };
  skipTLSVerification: {
    enabled: boolean;
    onToggle: (enabled: boolean) => void;
  };
  customHeaders?: CustomHeadersConfig;
  readOnly?: boolean;
}

// Alias for backward compatibility
export type TLSAuthConfig = TLSConfig;
