/**
 * Config types - inlined from @grafana/plugin-ui to avoid internal package dependency
 * Source: https://github.com/grafana/plugin-ui/blob/main/src/components/ConfigEditor/types.ts
 * License: Apache-2.0
 */

import { type DataSourceSettings, type DataSourceJsonData } from '@grafana/data';

type DataSourceExclusiveConfig = {
  readOnly: DataSourceSettings['readOnly'];
  url: DataSourceSettings['url'];
  basicAuth: DataSourceSettings['basicAuth'];
  basicAuthUser: DataSourceSettings['basicAuthUser'];
  withCredentials: DataSourceSettings['withCredentials'];
};

export type Config<
  JSONData extends DataSourceJsonData = DataSourceJsonData,
  SecureJSONData = Record<string, unknown>,
> = {
  jsonData: DataSourceSettings<JSONData>['jsonData'];
  secureJsonData?: DataSourceSettings<JSONData, SecureJSONData>['secureJsonData'];
  secureJsonFields: DataSourceSettings['secureJsonFields'];
} & Partial<DataSourceExclusiveConfig>;

export type OnChangeHandler<C extends Config = Config> = (config: C) => void;
