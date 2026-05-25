import { FalconQuery_V9 } from './FalconQuery_V9';

const NON_ITM_HISTORY_TABLES_V10: Record<string, Set<string>> = {
  ZCSUMM: new Set(['STIME', 'ETIME']),
  ZCOUTBSUM: new Set(['STIME', 'ETIME']),
  ZCOUBDET: new Set(['STIME', 'ETIME']),
  ZCCLUSTER: new Set(['STIME', 'ETIME']),
  ZCCLDETL: new Set(['STIME', 'ETIME']),
};

/**
 * V10 is the same structure as V9 metrics/situations/managedSystems queries
 * but with version bumped to 10 and NON_ITM tables parmas cleaned.
 * Since V11 adds 'time-series' query type, V10 keeps the V9 union structure.
 */
export type FalconQuery_V10 = Omit<FalconQuery_V9, 'falconVersion'> & { falconVersion: 10 };

export function updateTo_V10(current: FalconQuery_V9): FalconQuery_V10 {
  if (current.queryType !== 'metrics') {
    return { ...current, falconVersion: 10 } as FalconQuery_V10;
  }

  const parmaNames = NON_ITM_HISTORY_TABLES_V10[current.falconParams.tableId];
  if (!parmaNames) {
    return { ...current, falconVersion: 10 } as FalconQuery_V10;
  }

  const newParmas = current.falconParams.parmas.filter((parma) => !parmaNames.has(parma.name));

  return {
    ...current,
    falconParams: {
      ...current.falconParams,
      parmas: newParmas,
      history: true,
    },
    falconVersion: 10,
  } as FalconQuery_V10;
}
