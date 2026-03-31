import { css } from '@emotion/css';
import { GrafanaTheme2, VariableType } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import { Alert, Field, MultiSelect, useStyles2 } from '@grafana/ui';
import { AffinityId, Agent } from 'public-domain';
import React, { useMemo } from 'react';

import { tid } from 'datasource/components';
import { SourceDef } from 'datasource/domain';
import { parseAgentDef, stringifyAgentDef } from 'datasource/domain/agentDefUtils';
import { useAgentsAndGroups } from 'datasource/features/metadata';

import { FormOptionsResult, SelectableFormOption, getFormOptionsResult } from './formOptionsHooks';

type ManagedSystemsSelectorProps = {
  affinityId: AffinityId;
  agentsAndGroups: SourceDef[];
  changeMetricsQueryParams: (changes: { agentsAndGroups: SourceDef[] }) => void;
};

export function ManagedSystemsSelector({
  affinityId,
  agentsAndGroups,
  changeMetricsQueryParams,
}: ManagedSystemsSelectorProps) {
  const agentsAndGroupsOptionsResult = useAgentsAndGroupsOptions(affinityId);
  const unsupportedAgents = useUnsupportedAgents(affinityId);
  const styles = useStyles2(getStyles);
  const currentValue = useMemo(() => agentsAndGroups.map((agent) => stringifyAgentDef(agent)), [agentsAndGroups]);

  return (
    <>
      {!!unsupportedAgents.length && <AgentsWarning unsupportedAgents={unsupportedAgents} />}
      <Field
        label="Managed systems"
        description="(*groupname or $originnode)"
        className={styles.managedSystemsField}
        data-testid={tid('query-editor.field.managed-systems')}
      >
        <MultiSelect
          isLoading={agentsAndGroupsOptionsResult.isFetching}
          options={agentsAndGroupsOptionsResult.data}
          value={currentValue}
          onChange={(rawSelectedAgentOptions) => {
            const selectedAgentOptions = rawSelectedAgentOptions as SelectableFormOption[];
            changeMetricsQueryParams({
              agentsAndGroups: selectedAgentOptions.map((o) => parseAgentDef(o.value)),
            });
          }}
          disabled={!affinityId}
          isClearable
          isSearchable
          allowCustomValue
          closeMenuOnSelect={false}
        />
      </Field>
    </>
  );
}

function getStyles(theme: GrafanaTheme2) {
  return {
    managedSystemsField: css({
      '& label': {
        display: 'flex',
        '& span': {
          marginTop: 0,
          marginLeft: theme.spacing(1),
        },
      },
    }),
    link: css({
      color: theme.colors.text.link,
      '&:hover': {
        textDecoration: 'underline',
      },
    }),
  };
}

function getVariablesAsSelectOptions() {
  const supportedVariables: VariableType[] = ['query', 'constant', 'custom'];

  const variables = getTemplateSrv().getVariables();
  return variables
    .filter((variable) => supportedVariables.includes(variable.type))
    .map((variable) => {
      return {
        label: `$${variable.label || variable.name}`,
        value: `$${variable.name}`,
        description: `${variable.description || ''}`,
      };
    });
}

function useAgentsAndGroupsOptions(affinityId: AffinityId): FormOptionsResult {
  const agentsAndGroupsResult = useAgentsAndGroups(affinityId);
  const agentsAndGroupsOptions = useMemo(() => {
    const variableOptions = getVariablesAsSelectOptions();

    const agentOptions = agentsAndGroupsResult.data?.agents?.map((v) => ({
      label: v.originnode,
      description: `${v.version} ${v.isOnline ? '' : '(Offline)'}`,
      value: v.originnode,
    }));

    const groupOptions = agentsAndGroupsResult.data?.groups?.map((v) => ({
      label: v.name,
      description: `Group for ${v.affinityEntity.displayText}`,
      value: v.name,
    }));

    return [variableOptions, agentOptions || [], groupOptions || []]
      .map((options) => [...options].sort((a, b) => a.label.localeCompare(b.label)))
      .flat();
  }, [agentsAndGroupsResult.data]);

  const agentsAndGroupsOptionsResult = getFormOptionsResult(agentsAndGroupsResult, agentsAndGroupsOptions);

  return agentsAndGroupsOptionsResult;
}

function useUnsupportedAgents(affinityId: AffinityId): Agent[] {
  const agentsAndGroupsResult = useAgentsAndGroups(affinityId);
  const unsupportedAgents = useMemo(
    () => agentsAndGroupsResult.data?.unsupportedAgents,
    [agentsAndGroupsResult.data?.unsupportedAgents]
  );
  return unsupportedAgents ?? ([] as Agent[]);
}

// All agents passed here should have the same affinityEntity
function AgentsWarning({ unsupportedAgents }: { unsupportedAgents: Agent[] }) {
  const styles = useStyles2(getStyles);

  const productName = unsupportedAgents[0]?.affinityEntity.displayText;
  const productCode = unsupportedAgents[0]?.affinityEntity.productCode;

  const warningMessage = `OMEGAMON ${
    productName ? productName + ' ' : ''
  }agents below v05.60.00 are not supported, please upgrade to v06.10.00 or later. `;

  function GetUpgradeInfo() {
    const infoUrls: Record<string, string> = {
      KM5: 'https://www.ibm.com/docs/en/zoafz/6.1.0?topic=coexistence-compatibility',
      KN3: 'https://www.ibm.com/docs/en/om-nm/6.1.0?topic=coexistence-compatibility',
    };

    if (productCode && infoUrls[productCode]) {
      return (
        <>
          {'For more information, visit '}
          <a href={infoUrls[productCode]} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {infoUrls[productCode]}
          </a>
          {'.'}
        </>
      );
    }

    return null;
  }

  const agentsWithVersions = unsupportedAgents.map((agent) => {
    return `${agent.originnode} (v${agent.versionString})`;
  });

  const detailsMessage = `Agents with unsupported versions: ${agentsWithVersions.join(', ')}.`;

  return (
    <Alert
      title="Unsupported managed systems version found"
      severity="warning"
      data-testid={tid('query-editor.field.managed-systems-version-warning')}
    >
      {warningMessage}
      <GetUpgradeInfo />
      <details data-testid={tid('query-editor.field.managed-systems-version-warning-details')}>
        {detailsMessage}
      </details>
    </Alert>
  );
}
