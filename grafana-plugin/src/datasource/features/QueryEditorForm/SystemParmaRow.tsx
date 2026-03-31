import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2, Input, IconButton, Alert } from '@grafana/ui';
import React, { memo, FormEvent } from 'react';

import { tid } from 'datasource/components';
import { MetricsQueryParma } from 'datasource/domain';

import { parmaIsNodelist } from './parmaValidator';

export const getParmaStyles = (theme: GrafanaTheme2) => {
  const row = css({
    display: 'grid',
    gridTemplateColumns: '10fr 20fr 5fr 1fr',
    justifyItems: 'stretch',
    alignItems: 'center',
    columnGap: theme.spacing(2),
  });

  return {
    systemParmaHeader: row,
    systemParma: css(
      {
        marginBottom: theme.spacing(2),
      },
      row
    ),
  };
};

interface SystemParmaRowParams {
  parma: MetricsQueryParma;
  disabled: boolean;
  onChange: (key: keyof MetricsQueryParma, parma: MetricsQueryParma, value: string | number) => void;
  onDelete?: (parma: MetricsQueryParma) => void;
}

export const SystemParmaRow = memo(function SystemParmaRow({
  parma,
  disabled,
  onChange,
  onDelete,
}: SystemParmaRowParams) {
  const styles = useStyles2(getParmaStyles);

  const updateInput = (event: FormEvent<HTMLInputElement>, key: keyof MetricsQueryParma) => {
    const value = event.currentTarget.type === 'number' ? Number(event.currentTarget.value) : event.currentTarget.value;
    onChange(key, parma, value);
  };

  const deleteRow = () => onDelete?.(parma);

  const isNodelist = parmaIsNodelist(parma);

  return (
    <div data-testid={tid('query-editor.system-parma.div.container')}>
      <div className={styles.systemParma} data-testid={tid('query-editor.system-parma.div.row')}>
        <Input
          value={parma.name}
          type="text"
          disabled={disabled}
          invalid={isNodelist}
          placeholder="Enter parameter name"
          onChange={(event) => updateInput(event, 'name')}
          className={tid('query-editor.system-parma.div.name')}
        />
        <Input
          value={parma.value}
          type="text"
          disabled={disabled}
          placeholder="Enter comma-separated values"
          onChange={(event) => updateInput(event, 'value')}
          className={tid('query-editor.system-parma.div.value')}
        />
        <Input
          value={parma.length}
          type="number"
          disabled={disabled}
          onChange={(event) => updateInput(event, 'length')}
          className={tid('query-editor.system-parma.div.length')}
        />
        {onDelete ? (
          <IconButton
            aria-label="delete"
            name="trash-alt"
            size="lg"
            onClick={deleteRow}
            className={tid('query-editor.system-parma.button.remove')}
          />
        ) : null}
      </div>
      {isNodelist ? (
        <Alert severity="error" title="Forbidden parma 'NODELIST'">
          NODELIST parma is forbidden. To define agents and groups used in the query, use Managed Systems selector
          instead.
        </Alert>
      ) : null}
    </div>
  );
});
