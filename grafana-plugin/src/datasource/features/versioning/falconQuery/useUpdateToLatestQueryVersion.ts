import { DataQuery } from '@grafana/schema';
import { OmitPropertyFromUnion } from 'public-common';
import { useEffect, useState } from 'react';

import { FalconQuery, constructDefaultFalconQuery } from 'datasource/domain/';
import { MetadataLoader } from 'datasource/features/metadata';

import { isFalconQueryLatestVersion, isFalconQueryOfAnyVersion } from './isFalconQuery';
import { updateFalconQueryToLatestVersion } from './updateFalconQueryToLatestVersion';

type UseUpdateFalconQueryToLatestVersionResult =
  | {
      status: 'success';
      query: FalconQuery;
    }
  | {
      status: 'loading';
    }
  | {
      status: 'error';
      error: string;
    };

type UseUpdateFalconQueryToLatestVersionState = OmitPropertyFromUnion<
  UseUpdateFalconQueryToLatestVersionResult,
  'query'
>;

export function useUpdateFalconQueryToLatestVersion(
  possiblyCorruptedQuery: DataQuery,
  changeQuery: (arg0: FalconQuery) => void,
  metadataLoader: MetadataLoader
): UseUpdateFalconQueryToLatestVersionResult {
  const [currentState, setCurrentState] = useState<UseUpdateFalconQueryToLatestVersionState>({
    status: 'loading',
  });
  useEffect(() => {
    /* This effect is asynchronous, so we want to make sure we won't update the query if it already had been updated during this effect awaiting */
    let ignoreChangeQuery = false;

    const updateQuery = async () => {
      try {
        if (isFalconQueryLatestVersion(possiblyCorruptedQuery)) {
          /* React's functional components skip re-rendering when the new state matches the current state */
          setCurrentState({ status: 'success' });
          return;
        }

        let query: FalconQuery;
        if (isFalconQueryOfAnyVersion(possiblyCorruptedQuery)) {
          query = await updateFalconQueryToLatestVersion(possiblyCorruptedQuery, metadataLoader);
        } else {
          query = constructDefaultFalconQuery('metrics', possiblyCorruptedQuery);
        }

        if (!ignoreChangeQuery) {
          changeQuery(query);
          // Actually we don't use query from state, that's why we could make it null
          setCurrentState({ status: 'success' });
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setCurrentState({ status: 'error', error: `${message}` });
      }
    };

    updateQuery();

    return () => {
      ignoreChangeQuery = true;
    };
  }, [changeQuery, metadataLoader, possiblyCorruptedQuery]);

  if (currentState.status !== 'success') {
    return currentState;
  }

  if (isFalconQueryLatestVersion(possiblyCorruptedQuery)) {
    return {
      ...currentState,
      query: possiblyCorruptedQuery,
    };
  }

  /* In theory, it should never reach here. If it did, there is major bug either in
    query editor, either in Grafana's query state management. */
  return {
    status: 'error',
    error: 'Provided query is not a latest version of FalconQuery',
  };
}
