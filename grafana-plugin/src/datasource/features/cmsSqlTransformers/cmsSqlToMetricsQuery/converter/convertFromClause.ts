import { ApplicationMetadata } from 'public-domain';

import { MetricsQueryParams } from 'datasource/domain';
import { FromClause } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';

import { ConverterError, TokenMapping } from './internals';

export function convertFromClause(
  clause: FromClause,
  applications: ApplicationMetadata[],
  mapping: TokenMapping
): Pick<MetricsQueryParams, 'affinityId' | 'tableId'> {
  if (clause.tables.length > 1) {
    throw new ConverterError('Only single-table queries are supported', [clause]);
  }

  const [tableIdentifier] = clause.tables;
  if (!tableIdentifier) {
    throw new ConverterError('Table identifier is required', [clause]);
  }

  if (tableIdentifier.nodeType !== 'qualified_identifier') {
    throw new ConverterError('Qualified table identifier required instead of unqualified one', [clause]);
  }

  const { left, right } = tableIdentifier;

  mapping.registerRootAttachedNodes([left], 'affinityId');
  mapping.registerRootAttachedNodes([right], 'tableId');

  const applicationCode = left.tokenText.toUpperCase();
  const tableId = right.tokenText.toUpperCase();

  const suitableApplication = applications.filter((application) => application.applicationCode === applicationCode);

  if (!suitableApplication.length) {
    const availableApplications = new Set(applications.map(({ applicationCode }) => applicationCode));
    const availableApplicationsString = [...availableApplications].join(', ');
    throw new ConverterError(
      `Specified applicationCode '${applicationCode}' doesn't exist. Available options: ${availableApplicationsString}`,
      [clause]
    );
  }

  const application = applications.find((application) => {
    return application.applicationCode === applicationCode && application.tables.find((id) => id.id === tableId);
  });

  if (!application) {
    const suitableApplicationNames = suitableApplication.map(({ applicationName }) => applicationName);
    const applicationNamesString = suitableApplicationNames.join("', '");

    throw new ConverterError(
      `Specified tableId '${tableId}' doesn't exist in application(s) '${applicationNamesString}' (${applicationCode})`,
      [clause]
    );
  }

  return {
    affinityId: application.id,
    tableId: tableId,
  };
}
