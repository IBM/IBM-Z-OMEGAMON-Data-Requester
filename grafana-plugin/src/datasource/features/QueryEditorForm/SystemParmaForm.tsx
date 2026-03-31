import { useStyles2, Label, Button } from '@grafana/ui';
import React, { useCallback, memo, useState, useMemo } from 'react';

import { CollapseWithInfoIcon, tid } from 'datasource/components';
import { MetricsQueryParma, MetricsQueryParams, EMPTY_PARMA } from 'datasource/domain';

import { haveParmasWithProblem } from './parmaValidator';
import { getParmaStyles, SystemParmaRow } from './SystemParmaRow';

interface SystemParmaFormProps {
  params: MetricsQueryParma[];
  changeMetricsQueryParams: (changedParams: Partial<MetricsQueryParams>) => void;
  disabled: boolean;
}

const useRemoveParma = (
  parmas: MetricsQueryParma[],
  changeMetricsQueryParams: (changedParams: Partial<MetricsQueryParams>) => void
) => {
  return useCallback(
    (parma: MetricsQueryParma) => {
      const updatedParmas = parmas.filter((el) => el !== parma);
      changeMetricsQueryParams({
        parmas: updatedParmas,
      });
    },
    [parmas, changeMetricsQueryParams]
  );
};

const useUpdateParma = (
  parmas: MetricsQueryParma[],
  changeMetricsQueryParams: (changedParams: Partial<MetricsQueryParams>) => void
) => {
  return useCallback(
    (key: keyof MetricsQueryParma, parmaToUpdate: MetricsQueryParma, newValue: string | number) => {
      const updatedParma = { ...parmaToUpdate, [key]: newValue };
      if (!parmas.length) {
        changeMetricsQueryParams({
          parmas: [updatedParma],
        });
        return;
      }
      const updatedParmas = parmas.map((parma) => {
        if (parma !== parmaToUpdate) {
          return parma;
        }
        return updatedParma;
      });
      changeMetricsQueryParams({
        parmas: updatedParmas,
      });
    },
    [changeMetricsQueryParams, parmas]
  );
};

export const SystemParmaForm = memo(function SystemParmaForm({
  params,
  changeMetricsQueryParams,
  disabled,
}: SystemParmaFormProps) {
  const isCollapseExpandedByDefault = haveParmasWithProblem(params);
  const [isCollapseExpanded, setCollapseExpanded] = useState(isCollapseExpandedByDefault);
  const styles = useStyles2(getParmaStyles);
  const updateParma = useUpdateParma(params, changeMetricsQueryParams);
  const removeParma = useRemoveParma(params, changeMetricsQueryParams);
  const parmasToRender = useMemo(() => (params.length ? params : [EMPTY_PARMA]), [params]);

  const addNewParma = useCallback(() => {
    const updatedParmas = !params.length ? [{ ...EMPTY_PARMA }, { ...EMPTY_PARMA }] : [...params, { ...EMPTY_PARMA }];
    changeMetricsQueryParams({ parmas: updatedParmas });
  }, [changeMetricsQueryParams, params]);

  return (
    <CollapseWithInfoIcon
      label="System.Parma"
      title="Specify parameter in the query"
      isOpen={isCollapseExpanded}
      testId={tid('query-editor.collapse.system-parma')}
      onToggle={() => setCollapseExpanded((v) => !v)}
    >
      <div className={styles.systemParmaHeader} data-testid={tid('query-editor.system-parma.div.header')}>
        <Label data-testid={tid('query-editor.system-parma.header.label.name')}>Parameter name</Label>
        <Label data-testid={tid('query-editor.system-parma.header.label.value')}>Value</Label>
        <Label data-testid={tid('query-editor.system-parma.header.label.length')}>Length of Parma</Label>
      </div>
      {parmasToRender.map((param, index) => (
        <SystemParmaRow
          key={index}
          parma={param}
          disabled={disabled}
          onChange={updateParma}
          onDelete={params.length ? removeParma : undefined}
        />
      ))}
      <Button
        onClick={addNewParma}
        disabled={disabled}
        variant="secondary"
        data-testid={tid('query-editor.system-parma.button.add')}
      >
        Add
      </Button>
    </CollapseWithInfoIcon>
  );
});
