import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { useStyles2, IconButton } from '@grafana/ui';
import React from 'react';

import { tid } from 'datasource/components';
import { MetricsQueryFilterClause } from 'datasource/domain';
import { useCurrentTableMetadata } from 'datasource/features/metadata';

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: row;
  column-gap: 0.3em;
  align-items: center;
`;

const TextContainer = styled.div`
  height: 2.3em;
  line-height: 2.3em;
`;

type ReadOnlyClausePanelProps = {
  clause: MetricsQueryFilterClause;
  onStartEdit: (event: React.MouseEvent) => void;
};

export function ReadOnlyClausePanel({ clause, onStartEdit }: ReadOnlyClausePanelProps) {
  const styles = useStyles2((theme) => ({
    editButton: css({
      ':not(*:hover > * > * > &)': {
        display: 'none',
      },
      paddingLeft: '0.5em',
    }),
    emptyString: css`
      color: ${theme.colors.text.disabled};
    `,
  }));
  const { columnId, operator, userDefinedValue } = clause;

  const tableMetadata = useCurrentTableMetadata();
  const displayName = tableMetadata?.columns[columnId]?.name ?? columnId;

  return (
    <ContainerWrapper>
      <TextContainer data-testid={tid('clause-editor.view-mode.column')}>{displayName}</TextContainer>
      <TextContainer data-testid={tid('clause-editor.view-mode.operator')}>{operator}</TextContainer>
      {userDefinedValue !== '' ? (
        <TextContainer data-testid={tid('clause-editor.view-mode.value')}>{userDefinedValue}</TextContainer>
      ) : (
        <TextContainer className={styles.emptyString} data-testid={tid('clause-editor.view-mode.empty-string')}>
          {'<empty string>'}
        </TextContainer>
      )}
      <IconButton
        aria-label="edit"
        className={styles.editButton}
        name="pen"
        size="lg"
        onClick={onStartEdit}
        data-testid={tid('clause-editor.view-mode.edit-clause')}
      />
    </ContainerWrapper>
  );
}
