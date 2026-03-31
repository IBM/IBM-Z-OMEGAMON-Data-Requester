import { DataTransformerInfo, DataFrame, FieldType, TransformerRegistryItem } from '@grafana/data';
import { getDataSourceSrv } from '@grafana/runtime';
import { AffinityEntity, AffinityId, Agent } from 'public-domain';
import { mergeMap } from 'rxjs';

import { FalconDatasource } from 'datasource';
import { WithOptionalVersion } from 'datasource/features/versioning/common';

import { updateZOsOriginnodeTransformerOptionsToLatestVersion } from 'features/versioning/zOsOriginnodeTransformer';

import { ZOsOriginnodeTransformerEditor } from './ZOsOriginnodeTransformerEditor';
import { ZOsOriginnodeTransformerOptions } from './ZOsOriginnodeTransformerOptions';

const zOsSystemAffinity: AffinityEntity = {
  id: '%IBM.STATIC007' as AffinityId,
  displayText: 'zOS SYSTEM',
  productCode: 'KM5',
  symbol: 'a',
};

const zOsOriginnodeColumn = {
  name: 'zOsOriginnode',
  type: FieldType.string,
  config: {
    displayName: 'z/Os Originnode',
  },
};

function getZOsOriginnode(lpar: string, agents: Agent[]) {
  const zOsOriginnode = agents.find((agent) => agent.originnode.includes(`:${lpar}:`));

  return zOsOriginnode?.originnode || '';
}

function transformFrame(frame: DataFrame, column: string, agents: Agent[]): DataFrame {
  const lparField = frame.fields.find((field) => field.name === column);

  if (!lparField) {
    return frame;
  }

  const values = lparField.values.map((value) => getZOsOriginnode(value, agents));

  return {
    ...frame,
    fields: [
      ...frame.fields,
      {
        ...zOsOriginnodeColumn,
        values,
        labels: lparField.labels,
      },
    ],
  };
}

function getZOsOriginnodeTransformation(): DataTransformerInfo<ZOsOriginnodeTransformerOptions> {
  return {
    id: `omegamon-add-zos-originnode-transformation`,
    name: `OMEGAMON. Add zOS agent originnode`,
    description: `Add zOs agent originnode for each row`,
    defaultOptions: {},
    operator: (optionsOfUnknownVersion: WithOptionalVersion) => {
      const { datasourceUid, lparColumn } =
        updateZOsOriginnodeTransformerOptionsToLatestVersion(optionsOfUnknownVersion);
      return (source) => {
        return source.pipe(
          mergeMap(async (frameArray: DataFrame[]) => {
            if (!frameArray.length) {
              return frameArray;
            }

            if (!datasourceUid || !lparColumn) {
              throw new Error(
                "Both datasource and LPAR column should be choosen for 'add z/OS agent originnode' transformation"
              );
            }
            if (frameArray.length > 1) {
              throw new Error('Found more than one frame when "Add zOS agent originnode" only works with a single one');
            }

            const datasource = (await getDataSourceSrv().get({
              uid: datasourceUid,
              type: 'rocketsoftware-omegamon-datasource',
            })) as FalconDatasource;

            const { agents } = await datasource.metadataLoader.getAgentsAndGroupsByAffinity(zOsSystemAffinity);
            return frameArray.map((frame) => transformFrame(frame, lparColumn, agents));
          })
        );
      };
    },
  };
}

export function getZOsOriginnodeTransformer(): TransformerRegistryItem<ZOsOriginnodeTransformerOptions> {
  const transformation = getZOsOriginnodeTransformation();
  return {
    id: transformation.id,
    editor: ZOsOriginnodeTransformerEditor,
    transformation,
    name: transformation.name,
    description: transformation.description,
  };
}
