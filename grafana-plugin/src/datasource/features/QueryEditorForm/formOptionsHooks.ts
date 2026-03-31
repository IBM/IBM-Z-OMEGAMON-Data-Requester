import { SelectableValue } from '@grafana/data';
import {
  QueryObserverSuccessResult,
  QueryObserverLoadingResult,
  QueryObserverLoadingErrorResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { AffinityId } from 'public-domain';
import { useMemo } from 'react';

import { useApplicationMetadatas } from 'datasource/features/metadata';

export type SelectableFormOption<T = string> = SelectableValue<T> & { value: T };

export type TableOptionsMap = {
  [id: string]: FormOptionsResult;
};

export type FormOptionsSuccessResult<OPTION_TYPE extends SelectableFormOption = SelectableFormOption> = Omit<
  QueryObserverSuccessResult<OPTION_TYPE[]>,
  'refetch' // Having `refetch` doesn't make sense, as it would return pure metadata, not form options
>;

export type FormOptionsResult<OPTION_TYPE extends SelectableFormOption = SelectableFormOption> =
  | QueryObserverLoadingResult
  | QueryObserverLoadingErrorResult
  | FormOptionsSuccessResult<OPTION_TYPE>;

export function getFormOptionsResult<OPTION_TYPE extends SelectableFormOption>(
  useQueryResult: UseQueryResult,
  options: OPTION_TYPE[] = []
): FormOptionsResult<OPTION_TYPE> {
  if (useQueryResult.status === 'error') {
    return useQueryResult as QueryObserverLoadingErrorResult;
  }
  if (useQueryResult.status === 'loading') {
    return useQueryResult;
  }
  return {
    ...useQueryResult,
    data: options,
  };
}

export function useAppsAndTablesOptions(): {
  applicationOptionsResult: FormOptionsResult<SelectableFormOption<AffinityId>>;
  tableOptionsResult: TableOptionsMap;
} {
  const applicationMetadatasResult = useApplicationMetadatas();
  const { appOptions, tableOptions } = useMemo(() => {
    const appResult: Array<{ value: AffinityId; label: string }> = [];
    const tableResult: TableOptionsMap = {};

    applicationMetadatasResult.data?.forEach((v) => {
      appResult.push({
        value: v.id,
        label: v.applicationName,
      });
      tableResult[v.id] = getFormOptionsResult(
        applicationMetadatasResult,
        v.tables.map((t) => ({
          value: t.id,
          label: t.name,
        }))
      );
    });

    appResult.sort((a, b) => a.label.localeCompare(b.label));

    return {
      appOptions: appResult,
      tableOptions: tableResult,
    };
  }, [applicationMetadatasResult]);

  const appResult = getFormOptionsResult<SelectableFormOption<AffinityId>>(applicationMetadatasResult, appOptions);

  return { applicationOptionsResult: appResult, tableOptionsResult: tableOptions };
}
