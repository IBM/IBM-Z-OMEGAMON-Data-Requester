import { Field, DataQueryResponse, DataFrame, FieldType, DataQueryRequest } from '@grafana/data';
import { TableCellDisplayMode } from '@grafana/schema';
import { throwIfNullish } from 'public-common';
import { ActionDefinition, AffinityId, filterActions, TableMetadata } from 'public-domain';

import { FalconMetricsQuery, FalconQuery } from 'datasource/domain';
import { MetadataLoader } from 'datasource/features/metadata';

// eslint-disable-next-line no-restricted-imports
import pluginJson from '../../plugin.json';

import { addTakeActionToField } from './addTakeActionToField';
import { getOriginnodePromise } from './getOriginnodePromise';

async function getActions(affinityId: AffinityId, ml: MetadataLoader, tm: TableMetadata): Promise<ActionDefinition[]> {
  const actions = await ml.getAction(affinityId);
  return filterActions(actions, tm.name, tm.columns);
}

/**
 * CAUTION - bad code practice ahead!
 * Mutating existing response, cause in this case it should:
 * 1) probably cause no problems
 * 2) help with performance
 * 3) help reduce code complexity
 */
export async function addTakeActionToResponse(
  responseToMutate: DataQueryResponse,
  request: DataQueryRequest<FalconQuery>,
  ml: MetadataLoader,
  tableMds: TableMetadata[],
  adminPublicUrl: string,
  panelType?: string
): Promise<DataQueryResponse> {
  const newFramesPromises = (responseToMutate.data as DataFrame[]).map(async (frameToMutate, idx) => {
    if (frameToMutate.name === 'situations') {
      return frameToMutate;
    }
    const query = request.targets[idx] as FalconMetricsQuery;
    const singleOriginNodeFromTarget = await getOriginnodePromise(query.falconParams, ml);

    const tableMd = tableMds.find((tMd) => tMd.id === frameToMutate.name);

    const isTableView = panelType === 'table' || panelType === 'timeseries';
    throwIfNullish(tableMd, `Not found table metadata for table id '${frameToMutate.name}'`);

    const { affinityId } = query.falconParams;
    const targetActions = await getActions(affinityId, ml, tableMd);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const linkIcon = `${(window as any).__grafana_public_path__}plugins/${pluginJson.id}/static/link.svg`;
    if (isTableView && targetActions.length && frameToMutate.length) {
      const linkField: Field = {
        name: 'link',
        type: FieldType.string,
        config: {
          displayName: 'Take action',
          custom: {
            cellOptions: {
              alt: 'Link Alt',
              type: TableCellDisplayMode.Image,
            },
            width: 100,
          },
        },
        values: frameToMutate.fields[0]?.values.map((_) => linkIcon) || [],
      };
      addTakeActionToField(
        linkField,
        targetActions,
        frameToMutate,
        adminPublicUrl,
        tableMd,
        singleOriginNodeFromTarget,
        request.scopedVars
      );
      frameToMutate.fields.unshift(linkField);
      return frameToMutate;
    }

    // TO DO Support take action for charts/bar chars/ect
    // if (!isTableView && targetActions.length) {
    //   frameToMutate.fields.forEach((fieldToMutate) =>
    //     addTakeActionToField(
    //       fieldToMutate,
    //       targetActions,
    //       frameToMutate,
    //       adminPublicUrl,
    //       tableMd,
    //       singleOriginNodeFromTarget,
    //       request.scopedVars
    //     )
    //   );
    // }
    return frameToMutate;
  });

  try {
    const newFrames = await Promise.all(newFramesPromises);
    return { ...responseToMutate, data: newFrames };
  } catch (err) {
    // We don't want to fail whole request if we cannot load actions
    // OMUI5-1780: don't show Grafana toast notification in this case
    console.error(err);
    return responseToMutate;
  }
}
