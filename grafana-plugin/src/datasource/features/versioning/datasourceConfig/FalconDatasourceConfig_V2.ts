/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { FalconDatasourceConfig_V1 } from './FalconDatasourceConfig_V1';

const FALCON_DATASOURCE_OPTIONS_VERSION_V2 = 2;

export function updateTo_V2(current: FalconDatasourceConfig_V1): FalconDatasourceConfig_V2 {
  return {
    ...current,
    secureJsonData: undefined,
    url: current.jsonData.itmApiUri,
    basicAuth: true,
    basicAuthUser: current.jsonData.tsoUsername,
    jsonData: {
      falconVersion: FALCON_DATASOURCE_OPTIONS_VERSION_V2,
      keepCookies: [],
      storedKeepCookies: ['apimlAuthenticationToken'],
      metadataCacheTimeInSec: current.jsonData.metadataCacheTimeInSec,
      oauthPassThru: false,
      tlsSkipVerify: current.jsonData.skipTlsValidation,
    },
  };
}

/**
 * These are options configured for each Datasource instance.
 */

type GrafanaDefineJsonData_V2 = DEP_V2.DataSourceJsonData & {
  keepCookies: string[];
  tlsSkipVerify: boolean;
  oauthPassThru: boolean;
};

type FalconDatasourceJsonData_V2 = GrafanaDefineJsonData_V2 &
  DEP_V2.WithVersion<typeof FALCON_DATASOURCE_OPTIONS_VERSION_V2> & {
    metadataCacheTimeInSec: number;
    /** cookies added by user and stored for further use */
    storedKeepCookies: string[];
  };

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
type FalconDatasourceSecureJsonData_V2 = {
  basicAuthPassword?: string;
};

export type FalconDatasourceConfig_V2 = DEP_V2.DataSourceSettings<
  FalconDatasourceJsonData_V2,
  FalconDatasourceSecureJsonData_V2
>;

/* Module without 'declare' keyword cannot have export declarations */
declare module DEP_V2 {
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
