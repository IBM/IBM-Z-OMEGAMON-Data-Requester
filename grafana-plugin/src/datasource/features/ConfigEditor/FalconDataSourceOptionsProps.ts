// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

import { DataSourcePluginOptionsEditorProps } from '@grafana/data';

import { FalconDatasourceJsonData } from 'datasource/domain';

export type FalconDataSourceOptionsProps = DataSourcePluginOptionsEditorProps<FalconDatasourceJsonData>;
