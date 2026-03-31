import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2, Collapse, Icon } from '@grafana/ui';
import React from 'react';

type CollapseWithIconProps = React.PropsWithChildren<{
  label: string;
  title: string;
  isOpen: boolean;
  testId: string;
  onToggle(): void;
}>;

const getStyles = (theme: GrafanaTheme2) => {
  return {
    label: css({
      marginRight: theme.spacing(2),
    }),
    innerContainer: css({
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(3),
    }),
  };
};

export function CollapseWithInfoIcon({ label, title, isOpen, onToggle, testId, children }: CollapseWithIconProps) {
  const styles = useStyles2(getStyles);
  return (
    <Collapse
      label={
        <>
          <span className={styles.label}>{label}</span> <Icon name="info-circle" title={title} />
        </>
      }
      isOpen={isOpen}
      onToggle={onToggle}
      collapsible
      className={testId}
    >
      <div className={styles.innerContainer}>{children}</div>
    </Collapse>
  );
}
