import { useRef, useCallback } from 'react';

import { FalconQuery } from 'datasource/domain';

/**
 * Helps solve issue, that from Grafana we get `onChange` function, that is changing on every rerender.
 */
export function useStableChangeQueryFn(
  unstableChangeQuery: (query: FalconQuery) => void
): (query: FalconQuery) => void {
  const ref = useRef(unstableChangeQuery);

  ref.current = unstableChangeQuery;

  const stableChangeQuery = useCallback(
    (query: FalconQuery) => {
      ref.current(query);
    },
    [ref]
  );

  return stableChangeQuery;
}
