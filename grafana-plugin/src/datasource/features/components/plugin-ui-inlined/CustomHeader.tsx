/**
 * CustomHeader component - inlined from @grafana/plugin-ui v0.10.10
 * Source: https://unpkg.com/@grafana/plugin-ui@0.10.10/dist/esm/components/ConfigEditor/Auth/custom-headers/CustomHeader.js
 * License: Apache-2.0
 */

import { css, cx } from '@emotion/css';
import { useTheme2, InlineFieldRow, InlineField, Input, SecretInput, IconButton } from '@grafana/ui';
import React from 'react';

import { useCommonStyles } from './auth-styles';

// No-op function for readOnly mode to satisfy TypeScript and ESLint
const noop = () => {
  // Intentionally empty - used to disable functionality in readOnly mode
};

interface HeaderType {
  id: string;
  name: string;
  value: string;
  configured: boolean;
}

interface CustomHeaderProps {
  header: HeaderType;
  onChange: (header: HeaderType) => void;
  onBlur: () => void;
  onDelete: () => void;
  readOnly?: boolean;
}

export const CustomHeader = ({ header, onChange, onBlur, onDelete, readOnly }: CustomHeaderProps) => {
  const { spacing } = useTheme2();
  const commonStyles = useCommonStyles();

  const styles = {
    container: css({
      alignItems: 'center',
    }),
    input: css({
      minWidth: '100%',
    }),
    headerNameField: css({
      width: '40%',
      marginRight: 0,
      paddingRight: spacing(1),
    }),
    headerValueField: css({
      width: '45%',
      marginRight: 0,
    }),
    removeHeaderBtn: css({
      margin: `0 0 3px 10px`,
    }),
  };

  return (
    <>
      <InlineFieldRow className={styles.container}>
        <InlineField
          label="Header"
          labelWidth={9}
          grow={true}
          className={styles.headerNameField}
          htmlFor={`custom-header-${header.id}-name-input`}
          disabled={readOnly}
        >
          <Input
            id={`custom-header-${header.id}-name-input`}
            placeholder="X-Custom-Header"
            value={header.name}
            width={12}
            onChange={(e) => onChange({ ...header, name: e.currentTarget.value })}
            onBlur={onBlur}
            className={styles.input}
          />
        </InlineField>
        <InlineField
          label="Value"
          labelWidth={9}
          grow={true}
          className={cx(commonStyles.inlineFieldWithSecret, styles.headerValueField)}
          htmlFor={`custom-header-${header.id}-value-input`}
          disabled={readOnly}
        >
          <SecretInput
            id={`custom-header-${header.id}-value-input`}
            isConfigured={header.configured}
            placeholder="Header value"
            value={header.value}
            width={12}
            onChange={(e) => onChange({ ...header, value: e.currentTarget.value })}
            onReset={readOnly ? noop : () => onChange({ ...header, configured: false, value: '' })}
            onBlur={onBlur}
            className={styles.input}
          />
        </InlineField>
        <IconButton
          name="trash-alt"
          tooltip="Remove header"
          tooltipPlacement="top"
          className={styles.removeHeaderBtn}
          onClick={onDelete}
          type="button"
          disabled={readOnly}
        />
      </InlineFieldRow>
    </>
  );
};
