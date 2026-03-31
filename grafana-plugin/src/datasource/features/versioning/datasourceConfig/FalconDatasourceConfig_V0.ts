/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */

export interface FalconDatasourceJsonData_V0 extends DEP_V0.DataSourceJsonData {
  version: string;
  itmApiUri: string;
  tsoUsername: string;
  skipTlsValidation: boolean;
  temsSubscriptionHost: string;
  temsSubscriptionPort: number;
  metadataCacheTimeInSec: number;
}

interface FalconDatasourceSecureJsonData_V0 {
  tsoPassword?: string;
}

export type FalconDatasourceConfig_V0 = DEP_V0.DataSourceSettings<
  FalconDatasourceJsonData_V0,
  FalconDatasourceSecureJsonData_V0
>;

/* Module without 'declare' keyword cannot have export declarations */
declare module DEP_V0 {
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
  /* Imports of original file */
  export { DataSourceJsonData, DataSourceSettings };
}
