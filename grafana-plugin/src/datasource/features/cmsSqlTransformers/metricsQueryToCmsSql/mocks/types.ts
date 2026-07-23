// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

import { ApplicationMetadata, TableMetadata } from 'public-domain';

import { MetricsQueryParams } from 'datasource/domain';

interface MetricsQueryToCmsSqlTest {
  name: string;
  queryParams: MetricsQueryParams;
  applications: ApplicationMetadata[];
  metadata: TableMetadata | null;
  expectedOutput: string;
}

export interface MetricsQueryToCmsSqlTests {
  validMetricsQueries: MetricsQueryToCmsSqlTest[];
  invalidMetricsQueries: MetricsQueryToCmsSqlTest[];
}
