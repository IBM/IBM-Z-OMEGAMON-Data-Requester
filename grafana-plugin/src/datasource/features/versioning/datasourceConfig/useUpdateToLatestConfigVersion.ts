import { DataSourceSettings } from '@grafana/data';
import { useRef } from 'react';

import { FalconDatasourceConfig, FalconDatasourceJsonData, constructDefaultConfig } from 'datasource/domain/';

import {
  isFalconConfigOfAnyVersion,
  isFalconConfigOfLatestVersion,
  updateDatasourceConfigToLatestVersion,
} from './updateDatasourceConfigToLatestVersion';

export type UseUpdateConfigToLatestVersionResult =
  | {
      status: 'success';
      options: FalconDatasourceConfig;
      isUpdated: boolean;
    }
  | {
      status: 'error';
      error: string;
    };

function getUpdatedOptions(options: FalconDatasourceConfig): {
  isUpdated: boolean;
  updatedOptions: FalconDatasourceConfig;
} {
  if (isFalconConfigOfLatestVersion(options)) {
    return { isUpdated: false, updatedOptions: options };
  }

  if (isFalconConfigOfAnyVersion(options)) {
    return {
      isUpdated: true,
      updatedOptions: updateDatasourceConfigToLatestVersion(options),
    };
  }

  return {
    isUpdated: false,
    updatedOptions: constructDefaultConfig(options),
  };
}

export function useUpdateToLatestConfigVersion(
  possiblyCorruptedOptions: FalconDatasourceConfig,
  onOptionsChange: (options: DataSourceSettings<FalconDatasourceJsonData>) => void
): UseUpdateConfigToLatestVersionResult {
  const prevIsUpdated = useRef(false);
  try {
    const { isUpdated: currentIsUpdated, updatedOptions } = getUpdatedOptions(possiblyCorruptedOptions);
    if (updatedOptions !== possiblyCorruptedOptions) {
      onOptionsChange(updatedOptions);
    }
    // If the very first call of useUpdateToLatestConfigVersion was made with outdated options,
    // we need to keep returning ```isUpdated = true``` all the time no matter what.
    // All the following calls are (kind of) guaranteed to be called with latest versioned possiblyCorruptedOptions
    // Thus, getUpdatedOptions will return ```isUpdated = false``` and we have to ignore it.
    // Because of that, we use state with the only purpose of storing if isUpdated has ever been true.
    // useRef is easier to use than useState in this particular case
    prevIsUpdated.current = prevIsUpdated.current || currentIsUpdated;

    return {
      status: 'success',
      isUpdated: prevIsUpdated.current,
      options: updatedOptions,
    };
  } catch (err) {
    return {
      status: 'error',
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
