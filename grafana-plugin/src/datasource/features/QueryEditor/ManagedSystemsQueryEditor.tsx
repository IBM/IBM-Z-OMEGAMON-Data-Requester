import { SelectableValue } from '@grafana/data';
import { Field, Select } from '@grafana/ui';
import { AffinityId } from 'public-domain';
import React from 'react';

import { tid } from 'datasource/components';
import { ManagedSystemsQueryParams } from 'datasource/domain';
import { useAppsAndTablesOptions } from 'datasource/features/QueryEditorForm';

interface ManagedSystemsQueryEditorProps {
  params: ManagedSystemsQueryParams;
  changeManagedSystemsQueryParams: (params: Partial<ManagedSystemsQueryParams>) => void;
}

export function ManagedSystemsQueryEditor({ params, changeManagedSystemsQueryParams }: ManagedSystemsQueryEditorProps) {
  const { applicationOptionsResult } = useAppsAndTablesOptions();

  return (
    <Field
      label="Application"
      description="Select the application to query managed systems for"
      data-testid={tid('query-editor.field.managed-systems-application')}
    >
      <Select
        width={64}
        isLoading={applicationOptionsResult.isFetching}
        options={applicationOptionsResult.data}
        value={params.affinityId}
        onChange={(applicationOption: SelectableValue<AffinityId> | null) => {
          changeManagedSystemsQueryParams({
            affinityId: applicationOption?.value ?? ('' as AffinityId),
          });
        }}
        isClearable
        isSearchable
        placeholder="Select an application"
      />
    </Field>
  );
}
