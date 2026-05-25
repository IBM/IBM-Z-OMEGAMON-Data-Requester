/**
 * AuthMethodSettings component - inlined from @grafana/plugin-ui v0.10.10
 * Source: https://unpkg.com/@grafana/plugin-ui@0.10.10/dist/esm/components/ConfigEditor/Auth/auth-method/AuthMethodSettings.js
 * License: Apache-2.0
 */

import { css } from '@emotion/css';
import { useTheme2, Field, Select } from '@grafana/ui';
import React, { useState, useMemo } from 'react';

import { AuthMethod, type AuthMethodSelectOption, type CustomMethod, type CustomMethodId } from './auth-types';
import { BasicAuth } from './BasicAuth';
import { ConfigSubSection } from './ConfigSubSection';

const defaultOptions: Record<AuthMethod, AuthMethodSelectOption & { value: AuthMethod }> = {
  [AuthMethod.BasicAuth]: {
    label: 'Basic authentication',
    value: AuthMethod.BasicAuth,
    description: 'Authenticate with your data source username and password',
  },
  [AuthMethod.CrossSiteCredentials]: {
    label: 'Enable cross-site access control requests',
    value: AuthMethod.CrossSiteCredentials,
    description:
      'Allow cross-site Access-Control requests with your existing credentials and cookies. This enables the server to authenticate the user and perform authorized requests on their behalf on other domains.',
  },
  [AuthMethod.OAuthForward]: {
    label: 'Forward OAuth Identity',
    value: AuthMethod.OAuthForward,
    description:
      'Forward the OAuth access token (and if available: the OIDC ID token) of the user querying to the data source',
  },
  [AuthMethod.NoAuth]: {
    label: 'No Authentication',
    value: AuthMethod.NoAuth,
    description: 'Data source is available without authentication',
  },
};

interface AuthMethodSettingsProps {
  selectedMethod: AuthMethod | CustomMethodId;
  mostCommonMethod?: AuthMethod;
  visibleMethods?: Array<AuthMethod | CustomMethodId>;
  defaultOptionsOverrides?: Partial<Record<AuthMethod, AuthMethodSelectOption>>;
  customMethods?: CustomMethod[];
  onAuthMethodSelect: (method: AuthMethod | CustomMethodId) => void;
  basicAuth?: {
    user: string;
    passwordConfigured: boolean;
    onUserChange: (user: string) => void;
    onPasswordChange: (password: string) => void;
    onPasswordReset: () => void;
  };
  readOnly?: boolean;
}

export const AuthMethodSettings = ({
  selectedMethod,
  mostCommonMethod,
  visibleMethods: visibleMethodsFromProps,
  defaultOptionsOverrides,
  customMethods,
  onAuthMethodSelect,
  basicAuth,
  readOnly,
}: AuthMethodSettingsProps) => {
  const [authMethodChanged, setAuthMethodChanged] = useState(false);
  const { colors, spacing } = useTheme2();

  const visibleMethods = useMemo(() => {
    return (
      visibleMethodsFromProps ?? [
        AuthMethod.BasicAuth,
        AuthMethod.CrossSiteCredentials,
        AuthMethod.OAuthForward,
        AuthMethod.NoAuth,
        ...(customMethods?.map((m) => m.id) ?? []),
      ]
    );
  }, [customMethods, visibleMethodsFromProps]);

  const hasSelect = visibleMethods.length > 1;

  const preparedOptions = useMemo(() => {
    const customOptions =
      customMethods?.reduce(
        (acc, method) => {
          acc[method.id] = {
            label: method.label,
            value: method.id,
            description: method.description,
          };
          return acc;
        },
        {} as Record<string, { label: string; value: string; description: string }>
      ) ?? {};

    const preparedDefaultOptions: Record<string, AuthMethodSelectOption & { value: string }> = {};
    let k: keyof typeof defaultOptions;
    for (k in defaultOptions) {
      preparedDefaultOptions[k] = {
        ...defaultOptions[k],
        ...defaultOptionsOverrides?.[k],
      };
    }

    const allOptions = {
      ...customOptions,
      ...preparedDefaultOptions,
    };

    return visibleMethods
      .filter((method) => Boolean(allOptions[method]))
      .map((method) => {
        const option = allOptions[method];
        if (!option) {
          return null;
        }
        if (method === mostCommonMethod && hasSelect) {
          return {
            ...option,
            label: `${option.label} (most common)`,
          };
        }
        return option;
      })
      .filter((opt): opt is AuthMethodSelectOption & { value: string } => opt !== null);
  }, [visibleMethods, customMethods, defaultOptionsOverrides, mostCommonMethod, hasSelect]);

  let selected = selectedMethod;
  if (!hasSelect && visibleMethods.length > 0) {
    selected = visibleMethods[0] ?? selectedMethod;
  } else if (selectedMethod === AuthMethod.NoAuth && mostCommonMethod && !authMethodChanged) {
    selected = mostCommonMethod;
  }

  let AuthFieldsComponent: React.ReactNode = null;
  if (selected === AuthMethod.BasicAuth && basicAuth) {
    AuthFieldsComponent = <BasicAuth {...basicAuth} readOnly={readOnly} />;
  } else if (typeof selected === 'string' && selected.startsWith('custom-')) {
    AuthFieldsComponent = customMethods?.find((m) => m.id === selected)?.component ?? null;
  }

  const title = hasSelect ? 'Authentication methods' : (preparedOptions[0]?.label ?? '');
  const description = hasSelect
    ? 'Choose an authentication method to access the data source'
    : (preparedOptions[0]?.description ?? '');

  const styles = {
    authMethods: css({
      marginTop: spacing(2.5),
      ...(hasSelect && {
        padding: spacing(2),
        border: `1px solid ${colors.border.weak}`,
      }),
    }),
    selectedMethodFields: css({
      marginTop: spacing(1.5),
    }),
  };

  return (
    <ConfigSubSection title={title} description={description}>
      <div className={styles.authMethods}>
        {hasSelect && (
          <Field label="Authentication method">
            <Select
              inputId="auth-method-select"
              options={preparedOptions}
              value={selected}
              onChange={(option) => {
                setAuthMethodChanged(true);
                onAuthMethodSelect(option.value as AuthMethod | CustomMethodId);
              }}
              disabled={readOnly}
            />
          </Field>
        )}
        {AuthFieldsComponent && <div className={styles.selectedMethodFields}>{AuthFieldsComponent}</div>}
      </div>
    </ConfigSubSection>
  );
};
