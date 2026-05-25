/**
 * CustomHeaders component - inlined from @grafana/plugin-ui v0.10.10
 * Source: https://unpkg.com/@grafana/plugin-ui@0.10.10/dist/esm/components/ConfigEditor/Auth/custom-headers/CustomHeaders.js
 * License: Apache-2.0
 */

import { css } from '@emotion/css';
import { useTheme2, Button } from '@grafana/ui';
import React, { useState, useEffect } from 'react';

import { type HeaderWithValue, type Header } from './auth-types';
import { ConfigSubSection } from './ConfigSubSection';
import { CustomHeader } from './CustomHeader';

interface LocalHeader extends HeaderWithValue {
  id: string;
}

interface CustomHeadersProps {
  headers: Header[];
  onChange: (headers: HeaderWithValue[]) => void;
  readOnly?: boolean;
}

function uniqueId() {
  return Math.random().toString(16).slice(2);
}

export const CustomHeaders = ({ headers: headersFromProps, onChange, readOnly }: CustomHeadersProps) => {
  const { spacing } = useTheme2();

  const [headers, setHeaders] = useState<LocalHeader[]>(
    headersFromProps.map((header) => ({
      ...header,
      id: uniqueId(),
      value: '',
    }))
  );

  useEffect(() => {
    setHeaders((headers2) => {
      let changed = false;
      const newHeaders = headers2.map((header) => {
        const configured = headersFromProps.find((h) => h.name === header.name)?.configured;
        if (typeof configured !== 'undefined' && header.configured !== configured) {
          changed = true;
          return { ...header, configured };
        }
        return header;
      });
      if (changed) {
        return newHeaders;
      }
      return headers2;
    });
  }, [headersFromProps]);

  const onHeaderAdd = () => {
    setHeaders([...headers, { id: uniqueId(), name: '', value: '', configured: false }]);
  };

  const onHeaderChange = (id: string, header: LocalHeader) => {
    setHeaders(headers.map((h) => (h.id === id ? { ...header } : h)));
  };

  const onHeaderDelete = (id: string) => {
    const index = headers.findIndex((h) => h.id === id);
    if (index === -1) {
      return;
    }
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
    onChange(
      newHeaders.map(({ name, value, configured }) => ({
        name,
        value,
        configured,
      }))
    );
  };

  const onBlur = () => {
    onChange(
      headers.map(({ name, value, configured }) => ({
        name,
        value,
        configured,
      }))
    );
  };

  const styles = {
    container: css({
      marginTop: spacing(3),
    }),
    addHeaderButton: css({
      marginTop: spacing(1.5),
    }),
  };

  return (
    <div className={styles.container}>
      <ConfigSubSection
        title="HTTP headers"
        description="Pass along additional context and metadata about the request/response"
        isCollapsible={true}
        isInitiallyOpen={headers.length > 0}
      >
        <div>
          {headers.map((header) => (
            <CustomHeader
              key={header.id}
              header={header}
              onChange={(header2) => onHeaderChange(header2.id, header2)}
              onDelete={() => onHeaderDelete(header.id)}
              onBlur={onBlur}
              readOnly={readOnly}
            />
          ))}
        </div>
        <div className={styles.addHeaderButton}>
          <Button icon="plus" variant="secondary" fill="outline" onClick={onHeaderAdd} disabled={readOnly}>
            {headers.length === 0 ? 'Add header' : 'Add another header'}
          </Button>
        </div>
      </ConfigSubSection>
    </div>
  );
};
