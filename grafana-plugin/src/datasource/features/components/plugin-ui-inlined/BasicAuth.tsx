/**
 * BasicAuth component - inlined from @grafana/plugin-ui v0.10.10
 * Source: https://unpkg.com/@grafana/plugin-ui@0.10.10/dist/esm/components/ConfigEditor/Auth/auth-method/BasicAuth.js
 * License: Apache-2.0
 */

import { css, cx } from '@emotion/css';
import { InlineField, Input, SecretInput } from '@grafana/ui';
import React from 'react';

import { useCommonStyles } from './auth-styles';

// No-op function for readOnly mode to satisfy TypeScript and ESLint
const noop = () => {
  // Intentionally empty - used to disable functionality in readOnly mode
};

interface BasicAuthProps {
  user: string;
  passwordConfigured: boolean;
  userLabel?: string;
  userTooltip?: string;
  userPlaceholder?: string;
  passwordLabel?: string;
  passwordTooltip?: string;
  passwordPlaceholder?: string;
  onUserChange: (user: string) => void;
  onPasswordChange: (password: string) => void;
  onPasswordReset: () => void;
  readOnly?: boolean;
}

export const BasicAuth = ({
  user,
  passwordConfigured,
  userLabel = 'User',
  userTooltip = 'The username of the data source account',
  userPlaceholder = 'User',
  passwordLabel = 'Password',
  passwordTooltip = 'The password of the data source account',
  passwordPlaceholder = 'Password',
  onUserChange,
  onPasswordChange,
  onPasswordReset,
  readOnly,
}: BasicAuthProps) => {
  const commonStyles = useCommonStyles();
  const styles = {
    lastInlineField: css({
      marginBottom: 0,
    }),
  };

  return (
    <>
      <InlineField
        className={commonStyles.inlineFieldNoMarginRight}
        label={userLabel}
        labelWidth={24}
        tooltip={userTooltip}
        required={true}
        htmlFor="basic-auth-user-input"
        interactive={true}
        grow={true}
        disabled={readOnly}
      >
        <Input
          id="basic-auth-user-input"
          placeholder={userPlaceholder}
          value={user}
          onChange={(e) => onUserChange(e.currentTarget.value)}
          required={true}
        />
      </InlineField>
      <InlineField
        className={cx(
          commonStyles.inlineFieldNoMarginRight,
          commonStyles.inlineFieldWithSecret,
          styles.lastInlineField
        )}
        label={passwordLabel}
        labelWidth={24}
        tooltip={passwordTooltip}
        required={true}
        htmlFor="basic-auth-password-input"
        interactive={true}
        grow={true}
        disabled={readOnly}
      >
        <SecretInput
          id="basic-auth-password-input"
          isConfigured={passwordConfigured}
          onReset={readOnly ? noop : onPasswordReset}
          placeholder={passwordPlaceholder}
          onChange={(e) => onPasswordChange(e.currentTarget.value)}
          required={true}
        />
      </InlineField>
    </>
  );
};
