import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';
import React, { HTMLAttributes } from 'react';

const clausePanelContainerClass = css({
  display: 'flex',
  alignItems: 'center',
  flex: '1 0 auto',
  padding: '1em',
});

const clauseContainerClass = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: '1 0 auto',
  gap: '0.8em',
});

function getClauseEditorContainerClass(theme: GrafanaTheme2, isIncorrectClause: boolean): string {
  return css({
    display: 'flex',
    flexDirection: 'row',
    borderLeft: isIncorrectClause ? 'none' : `2px solid ${theme.colors.border.strong}`,
    background: theme.colors.background.secondary,
  });
}

interface ClauseEditorContainerProps extends HTMLAttributes<HTMLDivElement> {
  isIncorrectClause: boolean;
}

export function ClauseEditorContainer({ isIncorrectClause, ...rest }: ClauseEditorContainerProps) {
  const containerClass = useStyles2(getClauseEditorContainerClass, isIncorrectClause);
  return <div className={containerClass} {...rest} />;
}

export function ClausePanelContainer(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={clausePanelContainerClass} {...props} />;
}

export function ClauseContainer(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={clauseContainerClass} {...props} />;
}
