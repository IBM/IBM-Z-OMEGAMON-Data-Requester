import { DataFrame, FieldType, DataQueryRequest, DataQueryResponse } from '@grafana/data';
import { ManagedSystems } from 'public-domain';

// eslint-disable-next-line import/no-cycle
import { FalconDatasource } from 'datasource';
import { FalconQuery, FalconManagedSystemsQuery } from 'datasource/domain';

function createDataFrame(refId: string, values: string[] = []): DataFrame {
  return {
    refId,
    fields: [
      {
        name: 'Value',
        type: FieldType.string,
        values,
        config: {},
      },
    ],
    length: values.length,
  };
}

function extractManagedSystemNames(managedSystems: ManagedSystems): string[] {
  const values: string[] = [];

  managedSystems.agents?.forEach((agent) => values.push(agent.originnode));
  managedSystems.groups?.forEach((group) => values.push(group.name));

  return values;
}

export async function handleManagedSystemsQueries(
  datasource: FalconDatasource,
  request: DataQueryRequest<FalconQuery>
): Promise<DataQueryResponse> {
  const managedSystemsQueries = request.targets.filter(
    (query): query is FalconManagedSystemsQuery => query.queryType === 'managedSystems'
  );

  if (managedSystemsQueries.length === 0) {
    return { data: [] };
  }

  const applications = await datasource.metadataLoader.getApplicationMetadatas();

  const data = await Promise.all(
    managedSystemsQueries.map(async (query) => {
      const { affinityId } = query.managedSystemsParams;

      if (!affinityId) {
        return createDataFrame(query.refId);
      }

      const application = applications.find((app) => app.affinityEntity.id === affinityId);
      if (!application) {
        return createDataFrame(query.refId);
      }

      const managedSystems = await datasource.metadataLoader.getAgentsAndGroupsByAffinity(application.affinityEntity);

      const values = extractManagedSystemNames(managedSystems);
      return createDataFrame(query.refId, values);
    })
  );

  return { data };
}
