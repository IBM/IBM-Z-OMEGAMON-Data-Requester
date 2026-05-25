/**
 * Auth component - inlined from @grafana/plugin-ui v0.10.10
 * Source: https://unpkg.com/@grafana/plugin-ui@0.10.10/dist/esm/components/ConfigEditor/Auth/Auth.js
 * License: Apache-2.0
 */

import { css } from '@emotion/css';
import React from 'react';

import type { AuthProps } from './auth-types';
import { AuthMethodSettings } from './AuthMethodSettings';
import { ConfigSection } from './ConfigSection';
import { CustomHeaders } from './CustomHeaders';
import { TLSSettings } from './TLSSettings';

export const Auth = ({
  selectedMethod,
  visibleMethods,
  mostCommonMethod,
  defaultOptionsOverrides,
  customMethods,
  onAuthMethodSelect,
  basicAuth,
  TLSClientAuth,
  selfSignedCertificate,
  skipTLSVerification,
  customHeaders,
  readOnly,
}: AuthProps) => {
  const styles = {
    container: css({
      maxWidth: 578,
    }),
  };

  return (
    <ConfigSection title="Authentication">
      <div className={styles.container}>
        <AuthMethodSettings
          selectedMethod={selectedMethod}
          mostCommonMethod={mostCommonMethod}
          visibleMethods={visibleMethods}
          defaultOptionsOverrides={defaultOptionsOverrides}
          customMethods={customMethods}
          onAuthMethodSelect={onAuthMethodSelect}
          basicAuth={basicAuth}
          readOnly={readOnly}
        />
        <TLSSettings
          selfSignedCertificate={selfSignedCertificate}
          TLSClientAuth={TLSClientAuth}
          skipTLSVerification={skipTLSVerification}
          readOnly={readOnly}
        />
        {customHeaders && <CustomHeaders {...customHeaders} readOnly={readOnly} />}
      </div>
    </ConfigSection>
  );
};
