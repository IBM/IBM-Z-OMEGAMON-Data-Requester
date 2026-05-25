/**
 * TLSSettings component - inlined from @grafana/plugin-ui v0.10.10
 * Source: https://unpkg.com/@grafana/plugin-ui@0.10.10/dist/esm/components/ConfigEditor/Auth/tls/TLSSettings.js
 * License: Apache-2.0
 */

import { css } from '@emotion/css';
import { useTheme2 } from '@grafana/ui';
import React from 'react';

import { type TLSConfig } from './auth-types';
import { ConfigSubSection } from './ConfigSubSection';
import { SelfSignedCertificate } from './SelfSignedCertificate';
import { SkipTLSVerification } from './SkipTLSVerification';
import { TLSClientAuth } from './TLSClientAuth';

type TLSSettingsProps = TLSConfig & {
  readOnly?: boolean;
};

export const TLSSettings = ({
  selfSignedCertificate,
  TLSClientAuth: TLSClientAuthProps,
  skipTLSVerification,
  readOnly,
}: TLSSettingsProps) => {
  const { spacing } = useTheme2();

  const styles = {
    container: css({
      marginTop: spacing(3),
    }),
  };

  return (
    <ConfigSubSection
      className={styles.container}
      title="TLS settings"
      description="Additional security measures that can be applied on top of authentication"
    >
      <SelfSignedCertificate {...selfSignedCertificate} readOnly={readOnly} />
      <TLSClientAuth {...TLSClientAuthProps} readOnly={readOnly} />
      <SkipTLSVerification {...skipTLSVerification} readOnly={readOnly} />
    </ConfigSubSection>
  );
};
