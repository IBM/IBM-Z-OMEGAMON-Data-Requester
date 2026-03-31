import { DiscriminatedUnionMap } from 'public-common';
import { useState, useCallback } from 'react';

import { FalconQuery, MetricsQueryParams, FalconQueryType, constructDefaultFalconQuery } from 'datasource/domain';

export function useQueryState(query: FalconQuery, changeQuery: (falconQuery: FalconQuery) => void) {
  /**
   * Used to save and restore previously selected values after query editor tab switch
   */
  const [cachedQueries, setCachedQueries] = useState<Partial<DiscriminatedUnionMap<FalconQuery, 'queryType'>>>({});

  const changeMetricsQueryParams = useCallback(
    (params: Partial<MetricsQueryParams>) => {
      if (query.queryType !== 'metrics') {
        throw new Error("Attempt to change params of metrics query, when it's not active");
      }
      changeQuery({
        ...query,
        falconParams: {
          ...query.falconParams,
          ...params,
        },
      });
    },
    [query, changeQuery]
  );

  const changeQueryType = useCallback(
    (newlySelectedQueryType: FalconQueryType) => {
      setCachedQueries((prevCachedQueries) => ({ ...prevCachedQueries, [query.queryType]: query }));
      changeQuery(cachedQueries[newlySelectedQueryType] ?? constructDefaultFalconQuery(newlySelectedQueryType, query));
    },
    [query, changeQuery, cachedQueries]
  );

  return {
    changeMetricsQueryParams,
    changeQueryType,
  };
}
