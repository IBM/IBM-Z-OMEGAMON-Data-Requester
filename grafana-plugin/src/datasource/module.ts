import { DataSourcePlugin } from '@grafana/data';

// eslint-disable-next-line import/no-internal-modules
import 'public-ui/dist/public-ui.css';

import { FalconDatasource } from 'datasource';
import { FalconQuery, FalconDatasourceJsonData } from 'datasource/domain';
import { ConfigEditorWrapper } from 'datasource/features/ConfigEditor';
import { QueryEditorWrapper } from 'datasource/features/QueryEditor';

export const plugin = new DataSourcePlugin<FalconDatasource, FalconQuery, FalconDatasourceJsonData>(FalconDatasource)
  .setConfigEditor(ConfigEditorWrapper)
  .setQueryEditor(QueryEditorWrapper);
