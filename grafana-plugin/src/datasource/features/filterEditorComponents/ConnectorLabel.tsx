import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { Button, Toggletip, useStyles2 } from '@grafana/ui';
import { throwIfNullish } from 'public-common';
import { ClickBubblingStopper, type ConnectorLabelProps } from 'public-ui';
import React, { useState, useCallback } from 'react';

import { tid } from 'datasource/components';
import { MetricsQueryFilter, MetricsQueryFilterClause, MetricsQueryFilterOf } from 'datasource/domain';

function getStyles(theme: GrafanaTheme2) {
  return {
    connectorButton: css({
      width: '3.4em',
      textAlign: 'center',
      padding: '0.5em',
      borderRadius: '3em',
      border: `1px solid ${theme.colors.border.medium}`,
      backgroundColor: theme.colors.background.primary,
    }),
    editorHeader: css({ margin: 0, fontWeight: 'bold' }),
    editorParagraph: css({ margin: '2em 0 1em 0' }),
    editorButtonWrapper: css({ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }),
  };
}

/**
 * Returns the clause that is supposed to be rendered in the very bottom
 * for a given filter.
 */
function getLastClause(filter: MetricsQueryFilter): MetricsQueryFilterClause {
  if (filter.clause) {
    return filter.clause;
  }

  const lastFilter = ((filter.and ?? filter.or) as MetricsQueryFilter[]).at(-1);
  throwIfNullish(lastFilter, 'Composite filter should always contain at least one subfilter');
  return getLastClause(lastFilter as MetricsQueryFilter);
}

function getNewClauseFilter(filter: MetricsQueryFilter): MetricsQueryFilterOf<'clause'> {
  return {
    clause: {
      ...getLastClause(filter),
      userDefinedValue: '',
    },
  };
}

export function ConnectorLabel({
  compositeFilter,
  addClause,
  isRoot,
  connectorButtonStyle,
}: ConnectorLabelProps<MetricsQueryFilterClause>) {
  const connector = compositeFilter.and ? 'and' : 'or';
  const connectorStr = connector.toUpperCase();
  const reverseConnector = connector === 'and' ? 'or' : 'and';
  const reversedConnectorStr = reverseConnector.toUpperCase();

  const styles = useStyles2(getStyles);
  const [editorIsShown, setEditorIsShown] = useState(false);
  const showEditor = useCallback(() => {
    setEditorIsShown(true);
  }, []);
  const hideEditor = useCallback(() => {
    setEditorIsShown(false);
  }, []);

  const onAddClause = useCallback(() => {
    hideEditor();
    const clauseFilter = getNewClauseFilter(compositeFilter);
    addClause(clauseFilter, connector);
  }, [compositeFilter, connector, hideEditor, addClause]);

  const onWrapIntoNewFilter = useCallback(() => {
    hideEditor();
    const clauseFilter = getNewClauseFilter(compositeFilter);
    addClause(clauseFilter, reverseConnector);
  }, [addClause, compositeFilter, hideEditor, reverseConnector]);

  const ConnectorEditingPanel = (
    <ClickBubblingStopper>
      <div>
        <p className={styles.editorHeader}>Change condition</p>
        <p className={styles.editorParagraph}>Add new clause to the &apos;{connectorStr}&apos; condition</p>
        <div className={styles.editorButtonWrapper}>
          <Button onClick={onAddClause} data-testid={tid('connector-label.dialog.add-clause')}>
            Add clause
          </Button>
        </div>
        {!isRoot ? null : (
          <>
            <p className={styles.editorParagraph}>
              Wrap root condition into a new &apos;{reversedConnectorStr}&apos; condition
            </p>
            <div className={styles.editorButtonWrapper}>
              <Button onClick={onWrapIntoNewFilter} data-testid={tid('connector-label.dialog.wrap')}>
                Wrap into {reversedConnectorStr}
              </Button>
            </div>
          </>
        )}

        <p className={styles.editorParagraph}>
          Change &apos;{connectorStr}&apos; with &apos;{reversedConnectorStr}&apos; condition in the filter
        </p>
        <div className={styles.editorButtonWrapper}>
          <Button disabled data-testid={tid('connector-label.dialog.change-condition')}>
            Change to {reversedConnectorStr.toUpperCase()}
          </Button>
        </div>
      </div>
    </ClickBubblingStopper>
  );

  return (
    <Toggletip
      show={editorIsShown}
      onClose={hideEditor}
      onOpen={showEditor}
      content={ConnectorEditingPanel}
      data-testid={tid('connector-label')}
    >
      <button
        className={styles.connectorButton}
        style={connectorButtonStyle}
        data-testid={tid('connector-label.button')}
      >
        {connector.toUpperCase()}
      </button>
    </Toggletip>
  );
}
