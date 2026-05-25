/**
 * TLSSettingsSection component - inlined from @grafana/plugin-ui v0.10.10
 * Source: https://unpkg.com/@grafana/plugin-ui@0.10.10/dist/esm/components/ConfigEditor/Auth/tls/TLSSettingsSection.js
 * License: Apache-2.0
 */

import { css } from '@emotion/css';
import { useTheme2, Checkbox, Tooltip, Icon } from '@grafana/ui';
import React from 'react';

interface TLSSettingsSectionProps {
  children?: React.ReactNode;
  enabled: boolean;
  label: string;
  tooltipText: string;
  onToggle: (enabled: boolean) => void;
  readOnly?: boolean;
}

export const TLSSettingsSection = ({
  children,
  enabled,
  label,
  tooltipText,
  onToggle,
  readOnly,
}: TLSSettingsSectionProps) => {
  const { colors, spacing } = useTheme2();

  const styles = {
    container: css({
      marginTop: 3,
    }),
    checkboxContainer: css({
      display: 'flex',
      alignItems: 'center',
    }),
    infoIcon: css({
      marginTop: -2,
      marginLeft: 5,
      color: colors.text.secondary,
    }),
    content: css({
      margin: spacing(1, 0, 2, 3),
    }),
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkboxContainer}>
        <Checkbox value={enabled} label={label} onChange={() => onToggle(!enabled)} disabled={readOnly} />
        <Tooltip placement="top" content={tooltipText} interactive={true}>
          <Icon name="info-circle" className={styles.infoIcon} size="sm" />
        </Tooltip>
      </div>
      {enabled && children && <div className={styles.content}>{children}</div>}
    </div>
  );
};
