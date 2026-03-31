/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */

import { WithVersion } from 'datasource/features/versioning/common';

import { FalconDatasourceConfig_V0 } from './FalconDatasourceConfig_V0';

const FALCON_OPTIONS_VERSION_1 = 1;

export function updateTo_V1(current: FalconDatasourceConfig_V0): FalconDatasourceConfig_V1 {
  const { version, ...restOptions } = current.jsonData;
  const updatedJsonData: FalconDatasourceJsonData_V1 = {
    ...restOptions,
    falconVersion: FALCON_OPTIONS_VERSION_1,
  };
  return { ...current, jsonData: updatedJsonData };
}

/**
 * These are options configured for each Datasource instance.
 */
interface FalconDatasourceJsonData_V1 extends DEP_V1.DataSourceJsonData, WithVersion<typeof FALCON_OPTIONS_VERSION_1> {
  itmApiUri: string;
  tsoUsername: string;
  skipTlsValidation: boolean;
  temsSubscriptionHost: string;
  temsSubscriptionPort: number;
  metadataCacheTimeInSec: number;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
interface FalconDatasourceSecureJsonData_V1 {
  tsoPassword?: string;
}

export type FalconDatasourceConfig_V1 = DEP_V1.DataSourceSettings<
  FalconDatasourceJsonData_V1,
  FalconDatasourceSecureJsonData_V1
>;

/* Module without 'declare' keyword cannot have export declarations */
declare module DEP_V1 {
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
