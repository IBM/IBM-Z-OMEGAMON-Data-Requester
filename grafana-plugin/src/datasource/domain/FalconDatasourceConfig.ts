import { DataSourceJsonData, DataSourceSettings } from '@grafana/data';

import { WithVersion } from 'datasource/features/versioning/common';

export const FALCON_DATASOURCE_OPTIONS_VERSION = 8;

/**
 * These are options configured for each Datasource instance.
 *
 * NOTE: Even though we version whole FalconDatasourceConfig object, falconVersion field
 * is placed here in FalconDatasourceJsonData just because we don't suppose to add any new
 * fields into FalconDatasourceConfig object.
 *
 * We still use "legacy" properties from FalconDatasourceConfig (inherited from Grafana) because
 * Grafana's middleware uses it to issue requests to underlying services (in our case it's ITM API).
 */

type GrafanaDefineJsonData = DataSourceJsonData & {
  tlsSkipVerify: boolean;
  oauthPassThru: boolean;
  timeout: number; // http request timeout
};

export type FalconDatasourceJsonData = GrafanaDefineJsonData &
  WithVersion<typeof FALCON_DATASOURCE_OPTIONS_VERSION> & {
    metadataCacheTimeInSec: number;
    adminUrl: string;
  };

export type FalconDatasourceConfig = DataSourceSettings<FalconDatasourceJsonData>;

export type UnknownConfig = DataSourceSettings<DataSourceJsonData>;

const defaultFalconDatasourceJsonData: FalconDatasourceJsonData = {
  falconVersion: FALCON_DATASOURCE_OPTIONS_VERSION,
  tlsSkipVerify: false,
  oauthPassThru: true,
  metadataCacheTimeInSec: 5 * 60,
  timeout: 10 * 60,
  adminUrl: '',
};

export function constructDefaultConfig(options: UnknownConfig): FalconDatasourceConfig {
  const initializedJsonData = {
    ...defaultFalconDatasourceJsonData,
    ...options.jsonData,
  };
  return {
    ...options,
    jsonData: initializedJsonData,
  };
}
