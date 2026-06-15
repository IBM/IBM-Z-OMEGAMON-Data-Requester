import { SelectableValue } from '@grafana/data';
import {
  QueryObserverSuccessResult,
  QueryObserverPendingResult,
  QueryObserverLoadingErrorResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { AffinityId, HistoryCollectionEligibility } from 'public-domain';
import { useMemo } from 'react';

import { useApplicationMetadatas } from 'datasource/features/metadata';

export type SelectableFormOption<T = string> = SelectableValue<T> & { value: T };

export type TableFormOption = SelectableFormOption & {
  historyCollectionEligibility?: HistoryCollectionEligibility;
};

export type TableOptionsMap = {
  [id: string]: FormOptionsResult<TableFormOption>;
};

export type FormOptionsSuccessResult<OPTION_TYPE extends SelectableFormOption = SelectableFormOption> = Omit<
  QueryObserverSuccessResult<OPTION_TYPE[]>,
  'refetch' | 'promise' // Having `refetch` doesn't make sense, as it would return pure metadata, not form options
>;

export type FormOptionsResult<OPTION_TYPE extends SelectableFormOption = SelectableFormOption> =
  | QueryObserverPendingResult
  | QueryObserverLoadingErrorResult
  | FormOptionsSuccessResult<OPTION_TYPE>;

export function getFormOptionsResult<OPTION_TYPE extends SelectableFormOption>(
  useQueryResult: UseQueryResult,
  options: OPTION_TYPE[] = []
): FormOptionsResult<OPTION_TYPE> {
  if (useQueryResult.status === 'error') {
    return useQueryResult as QueryObserverLoadingErrorResult;
  }
  if (useQueryResult.status === 'pending') {
    return useQueryResult;
  }
  return {
    ...useQueryResult,
    data: options,
  } as FormOptionsSuccessResult<OPTION_TYPE>;
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
      const tableOptions = v.tables
        .map((t) => ({
          value: t.id,
          label: t.name,
          historyCollectionEligibility: t.historyCollectionEligibility,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
      tableResult[v.id] = getFormOptionsResult(applicationMetadatasResult, tableOptions);
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
