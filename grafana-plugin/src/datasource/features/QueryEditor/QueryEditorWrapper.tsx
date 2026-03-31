import { css } from '@emotion/css';
import { GrafanaTheme2, QueryEditorProps } from '@grafana/data';
import { Alert, LoadingPlaceholder, VerticalGroup, useStyles2 } from '@grafana/ui';
import React from 'react';

// eslint-disable-next-line import/no-cycle
import { FalconDatasource } from 'datasource';
import { GrafanaThemeProvider } from 'datasource/components';
import { FalconQuery, FalconDatasourceJsonData } from 'datasource/domain';
import { MetadataLoaderProvider } from 'datasource/features/metadata';
import { useUpdateFalconQueryToLatestVersion } from 'datasource/features/versioning/falconQuery';

import { QueryEditor } from './QueryEditor';
import { useStableChangeQueryFn } from './useStableChangeQueryFn';

const getStyles = (theme: GrafanaTheme2) => {
  return {
    centralizedLoading: css({
      display: 'flex',
      justifyContent: 'center',
      margin: '32px',
    }),
  };
};

export type QueryEditorWrapperProps = QueryEditorProps<FalconDatasource, FalconQuery, FalconDatasourceJsonData>;

/**
 * QueryEditorWrapper purpose is to prepare `query` prop:
 * 1. clean trash properties, that might be left from previously selected
 *   data source plugin
 * 2. initialize default values of each param
 */
export function QueryEditorWrapper({
  datasource,
  query: possiblyCorruptedQuery,
  onChange: unstableChangeQueryFn,
  onRunQuery: runQuery,
  isVariableQueryEditor = false,
}: QueryEditorWrapperProps & { isVariableQueryEditor?: boolean }) {
  const styles = useStyles2(getStyles);

  const changeQuery = useStableChangeQueryFn(unstableChangeQueryFn);

  const queryUpdateInfo = useUpdateFalconQueryToLatestVersion(
    possiblyCorruptedQuery,
    changeQuery,
    datasource.metadataLoader
  );

  switch (queryUpdateInfo.status) {
    case 'loading':
      return <LoadingPlaceholder className={styles.centralizedLoading} text="Loading " />;
    case 'success':
      return (
        <GrafanaThemeProvider>
          <MetadataLoaderProvider metadataLoader={datasource.metadataLoader}>
            <QueryEditor
              query={queryUpdateInfo.query}
              isVariableQueryEditor={isVariableQueryEditor}
              changeQuery={changeQuery}
              runQuery={runQuery}
            />
          </MetadataLoaderProvider>
        </GrafanaThemeProvider>
      );
    case 'error':
      return (
        <Alert severity="error" title="Error occurred during query initialization">
          <VerticalGroup>
            <div>{queryUpdateInfo.error}</div>
          </VerticalGroup>
        </Alert>
      );
  }
}
