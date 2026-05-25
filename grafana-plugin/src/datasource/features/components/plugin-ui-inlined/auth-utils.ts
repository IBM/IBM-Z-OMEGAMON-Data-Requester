/**
 * Auth utilities - inlined from @grafana/plugin-ui to avoid internal package dependency
 * Source: https://github.com/grafana/plugin-ui/blob/main/src/components/ConfigEditor/Auth/utils.ts
 * License: Apache-2.0
 */

import { AuthMethod, type AuthProps, type CustomMethodId, type Header } from './auth-types';
import { type Config, type OnChangeHandler } from './config-types';

const headerNamePrefix = 'httpHeaderName';
const headerValuePrefix = 'httpHeaderValue';

export function convertLegacyAuthProps<C extends Config = Config>({
  config,
  onChange,
}: {
  config: C;
  onChange: OnChangeHandler<C>;
}): AuthProps {
  // In v0.10.10, TLS properties are destructured, not nested
  const tlsProps = getTLSProps<C>(config, onChange);

  const props: AuthProps = {
    selectedMethod: getSelectedMethod<C>(config),
    onAuthMethodSelect: getOnAuthMethodSelectHandler<C>(config, onChange),
    basicAuth: getBasicAuthProps<C>(config, onChange),
    selfSignedCertificate: tlsProps.selfSignedCertificate,
    TLSClientAuth: tlsProps.TLSClientAuth,
    skipTLSVerification: tlsProps.skipTLSVerification,
    customHeaders: getCustomHeaders<C>(config, onChange),
    readOnly: config.readOnly,
  };

  return props;
}

export function getSelectedMethod<C extends Config = Config>(config: C): AuthMethod {
  if (config.basicAuth) {
    return AuthMethod.BasicAuth;
  }
  if (config.withCredentials) {
    return AuthMethod.CrossSiteCredentials;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((config.jsonData as any).oauthPassThru) {
    return AuthMethod.OAuthForward;
  }
  return AuthMethod.NoAuth;
}

export function getOnAuthMethodSelectHandler<C extends Config = Config>(
  config: C,
  onChange: OnChangeHandler<C>
): (method: AuthMethod | CustomMethodId) => void {
  return (method: AuthMethod | CustomMethodId) => {
    onChange({
      ...config,
      basicAuth: method === AuthMethod.BasicAuth,
      withCredentials: method === AuthMethod.CrossSiteCredentials,
      jsonData: {
        ...config.jsonData,
        oauthPassThru: method === AuthMethod.OAuthForward,
      },
    });
  };
}

export function getBasicAuthProps<C extends Config = Config>(
  config: C,
  onChange: OnChangeHandler<C>
): AuthProps['basicAuth'] {
  return {
    user: config.basicAuthUser || '',
    passwordConfigured: config.secureJsonFields?.basicAuthPassword || false,
    onUserChange: (user: string) => onChange({ ...config, basicAuthUser: user }),
    onPasswordChange: (password: string) =>
      onChange({
        ...config,
        secureJsonData: {
          ...config.secureJsonData,
          basicAuthPassword: password,
        },
      }),
    onPasswordReset: () =>
      onChange({
        ...config,
        secureJsonData: { ...config.secureJsonData, basicAuthPassword: '' },
        secureJsonFields: {
          ...config.secureJsonFields,
          basicAuthPassword: false,
        },
      }),
  };
}

// Helper to get TLS props structure
export function getTLSProps<C extends Config = Config>(
  config: C,
  onChange: OnChangeHandler<C>
): {
  selfSignedCertificate: AuthProps['selfSignedCertificate'];
  TLSClientAuth: AuthProps['TLSClientAuth'];
  skipTLSVerification: AuthProps['skipTLSVerification'];
} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsonData = config.jsonData as any;
  return {
    selfSignedCertificate: {
      enabled: Boolean(jsonData.tlsAuthWithCACert),
      certificateConfigured: !!config.secureJsonFields?.tlsCACert,
      onToggle: (enabled) =>
        enabled
          ? onChange({
              ...config,
              jsonData: { ...config.jsonData, tlsAuthWithCACert: enabled },
            })
          : onChange({
              ...config,
              jsonData: { ...config.jsonData, tlsAuthWithCACert: enabled },
              secureJsonData: { ...config.secureJsonData, tlsCACert: '' },
              secureJsonFields: { ...config.secureJsonFields, tlsCACert: false },
            }),
      onCertificateChange: (certificate) =>
        onChange({
          ...config,
          secureJsonData: { ...config.secureJsonData, tlsCACert: certificate },
        }),
      onCertificateReset: () =>
        onChange({
          ...config,
          secureJsonData: { ...config.secureJsonData, tlsCACert: '' },
          secureJsonFields: { ...config.secureJsonFields, tlsCACert: false },
        }),
    },
    TLSClientAuth: {
      enabled: jsonData.tlsAuth || false,
      serverName: jsonData.serverName || '',
      clientCertificateConfigured: !!config.secureJsonFields?.tlsClientCert,
      clientKeyConfigured: !!config.secureJsonFields?.tlsClientKey,
      onToggle: (enabled) =>
        enabled
          ? onChange({
              ...config,
              jsonData: { ...config.jsonData, tlsAuth: enabled },
            })
          : onChange({
              ...config,
              jsonData: { ...config.jsonData, tlsAuth: enabled, serverName: '' },
              secureJsonData: { ...config.secureJsonData, tlsClientCert: '', tlsClientKey: '' },
              secureJsonFields: { ...config.secureJsonFields, tlsClientCert: false, tlsClientKey: false },
            }),
      onServerNameChange: (serverName) =>
        onChange({
          ...config,
          jsonData: { ...config.jsonData, serverName },
        }),
      onClientCertificateChange: (clientCertificate) =>
        onChange({
          ...config,
          secureJsonData: {
            ...config.secureJsonData,
            tlsClientCert: clientCertificate,
          },
        }),
      onClientCertificateReset: () =>
        onChange({
          ...config,
          secureJsonData: {
            ...config.secureJsonData,
            tlsClientCert: '',
          },
          secureJsonFields: {
            ...config.secureJsonFields,
            tlsClientCert: false,
          },
        }),
      onClientKeyChange: (clientKey) =>
        onChange({
          ...config,
          secureJsonData: {
            ...config.secureJsonData,
            tlsClientKey: clientKey,
          },
        }),
      onClientKeyReset: () =>
        onChange({
          ...config,
          secureJsonData: {
            ...config.secureJsonData,
            tlsClientKey: '',
          },
          secureJsonFields: {
            ...config.secureJsonFields,
            tlsClientKey: false,
          },
        }),
    },
    skipTLSVerification: {
      enabled: jsonData.tlsSkipVerify || false,
      onToggle: (enabled) =>
        onChange({
          ...config,
          jsonData: { ...config.jsonData, tlsSkipVerify: enabled },
        }),
    },
  };
}

export function getCustomHeaders<C extends Config = Config>(
  config: C,
  onChange: OnChangeHandler<C>
): AuthProps['customHeaders'] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsonData = config.jsonData as any;
  const headers: Header[] = Object.keys(jsonData)
    .filter((key) => key.startsWith(headerNamePrefix))
    .sort()
    .map((key) => {
      const index = key.slice(headerNamePrefix.length);
      return {
        name: jsonData[key],
        configured: config.secureJsonFields[`${headerValuePrefix}${index}`] ?? false,
      };
    });

  return {
    headers,
    onChange: (headers) => {
      const newJsonData = Object.fromEntries(
        Object.entries(config.jsonData).filter(([key]) => !key.startsWith(headerNamePrefix))
      );
      const newSecureJsonData = Object.fromEntries(
        Object.entries(config.secureJsonData || {}).filter(([key]) => !key.startsWith(headerValuePrefix))
      );
      const newSecureJsonFields = Object.fromEntries(
        Object.entries(config.secureJsonFields).filter(([key]) => !key.startsWith(headerValuePrefix))
      );

      headers.forEach((header, index) => {
        newJsonData[`${headerNamePrefix}${index + 1}`] = header.name;
        if (header.configured) {
          newSecureJsonFields[`${headerValuePrefix}${index + 1}`] = true;
        } else {
          newSecureJsonData[`${headerValuePrefix}${index + 1}`] = header.value;
        }
      });

      onChange({
        ...config,
        jsonData: newJsonData,
        secureJsonData: newSecureJsonData,
        secureJsonFields: newSecureJsonFields,
      });
    },
  };
}
