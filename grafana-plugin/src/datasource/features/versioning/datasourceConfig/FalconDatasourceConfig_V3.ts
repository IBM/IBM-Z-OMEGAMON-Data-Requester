/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { FalconDatasourceConfig_V2 } from './FalconDatasourceConfig_V2';

const FALCON_DATASOURCE_OPTIONS_VERSION_V3 = 3;

export function updateTo_V3(current: FalconDatasourceConfig_V2): FalconDatasourceConfig_V3 {
  return {
    ...current,
    jsonData: {
      ...current.jsonData,
      falconVersion: FALCON_DATASOURCE_OPTIONS_VERSION_V3,
      timeout: 10 * 60,
    },
  };
}

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

type GrafanaDefineJsonData_V3 = DEP_V3.DataSourceJsonData & {
  keepCookies: string[];
  tlsSkipVerify: boolean;
  oauthPassThru: boolean;
  // http request timeout
  timeout: number;
};

type FalconDatasourceJsonData_V3 = GrafanaDefineJsonData_V3 &
  DEP_V3.WithVersion<typeof FALCON_DATASOURCE_OPTIONS_VERSION_V3> & {
    metadataCacheTimeInSec: number;
    /** cookies added by user and stored for further use */
    storedKeepCookies: string[];
  };

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
type FalconDatasourceSecureJsonData_V3 = {
  basicAuthPassword?: string;
};

export type FalconDatasourceConfig_V3 = DEP_V3.DataSourceSettings<
  FalconDatasourceJsonData_V3,
  FalconDatasourceSecureJsonData_V3
>;

/* Module without 'declare' keyword cannot have export declarations */
declare module DEP_V3 {
  interface DataSourceJsonData {
    authType?: string;
    defaultRegion?: string;
    profile?: string;
    manageAlerts?: boolean;
    alertmanagerUid?: string;
  }

  type Record<K extends keyof any, T> = { [P in K]: T };

  /**
   * With RBAC, the backend will return additional access control metadata to objects.
   * These metadata will contain user permissions associated to a given resource.
   *
   * For example:
   * {
   *   accessControl: { "datasources:read": true, "datasources:write": true }
   * }
   */
  interface WithAccessControlMetadata {
    accessControl?: Record<string, boolean>;
  }

  type KeyValue<T = any> = Record<string, T>;

  /**
   * Data Source instance edit model.  This is returned from:
   *  /api/datasources
   */
  interface DataSourceSettings<T extends DataSourceJsonData = DataSourceJsonData, S = {}>
    extends WithAccessControlMetadata {
    id: number;
    uid: string;
    orgId: number;
    name: string;
    typeLogoUrl: string;
    type: string;
    typeName: string;
    access: string;
    url: string;
    user: string;
    /**
     * @deprecated -- use jsonData to store information related to database.
     *  This field should only be used by Elasticsearch and Influxdb.
     */
    database: string;
    basicAuth: boolean;
    basicAuthUser: string;
    isDefault: boolean;
    jsonData: T;
    secureJsonData?: S;
    secureJsonFields: KeyValue<boolean>;
    readOnly: boolean;
    withCredentials: boolean;
    version?: number;
  }

  type WithVersion<TVersion extends number = number> = { falconVersion: TVersion };

  /* Imports of original file */
  export { DataSourceJsonData, DataSourceSettings, WithVersion };
}
