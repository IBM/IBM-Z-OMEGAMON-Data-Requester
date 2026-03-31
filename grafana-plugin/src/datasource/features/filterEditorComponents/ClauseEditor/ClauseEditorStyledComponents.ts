import styled from '@emotion/styled';

export const ClauseEditorContainer = styled.div<{ isIncorrectClause: boolean }>`
  display: flex;
  flex-direction: row;
  border-left: ${({ theme, isIncorrectClause }) =>
    isIncorrectClause ? 'none' : `2px solid ${theme.colors.border.strong}`};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const ClausePanelContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  padding: 1em;
`;

export const ClauseContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 0 auto;
  gap: 0.8em;
`;
