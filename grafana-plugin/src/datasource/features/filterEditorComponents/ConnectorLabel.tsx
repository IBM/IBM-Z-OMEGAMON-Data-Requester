import styled from '@emotion/styled';
import { Button, Toggletip } from '@grafana/ui';
import { throwIfNullish } from 'public-common';
import { ClickBubblingStopper, type ConnectorLabelProps } from 'public-ui';
import React, { useState, useCallback } from 'react';

import { tid } from 'datasource/components';
import { MetricsQueryFilter, MetricsQueryFilterClause, MetricsQueryFilterOf } from 'datasource/domain';

const ConnectorButton = styled.button`
  width: 3.4em;
  text-align: center;
  padding: 0.5em;
  border-radius: 3em;
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const EditorContainer = styled.div``;

const EditorHeader = styled.p`
  margin: 0;
  font-weight: bold;
`;

const EditorParagraph = styled.p`
  margin: 2em 0 1em 0;
`;

const EditorButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

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
      <EditorContainer>
        <EditorHeader>Change condition</EditorHeader>
        <EditorParagraph>Add new clause to the &apos;{connectorStr}&apos; condition</EditorParagraph>
        <EditorButtonWrapper>
          <Button onClick={onAddClause} data-testid={tid('connector-label.dialog.add-clause')}>
            Add clause
          </Button>
        </EditorButtonWrapper>
        {!isRoot ? null : (
          <>
            <EditorParagraph>
              Wrap root condition into a new &apos;{reversedConnectorStr}&apos; condition
            </EditorParagraph>
            <EditorButtonWrapper>
              <Button onClick={onWrapIntoNewFilter} data-testid={tid('connector-label.dialog.wrap')}>
                Wrap into {reversedConnectorStr}
              </Button>
            </EditorButtonWrapper>
          </>
        )}

        <EditorParagraph>
          Change &apos;{connectorStr}&apos; with &apos;{reversedConnectorStr}&apos; condition in the filter
        </EditorParagraph>
        <EditorButtonWrapper>
          <Button disabled data-testid={tid('connector-label.dialog.change-condition')}>
            Change to {reversedConnectorStr.toUpperCase()}
          </Button>
        </EditorButtonWrapper>
      </EditorContainer>
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
      <ConnectorButton style={connectorButtonStyle} data-testid={tid('connector-label.button')}>
        {connector.toUpperCase()}
      </ConnectorButton>
    </Toggletip>
  );
}
