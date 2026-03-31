/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AdHocVariableFilter, ScopedVars } from '@grafana/data';
import { VariableInterpolation } from '@grafana/runtime';
import { AffinityId, TableMetadata } from 'public-domain';

import {
  mockedTableMetadata,
  mockedReplaceFnInputOutputMap,
  mockedTypedVariableModels,
  scopedVars,
} from 'datasource/features/variables/mocks';

import { FalconDatasource } from './datasource';
import { FalconMetricsQuery, MetricsQueryFilters } from './domain';
import { FilterOperator } from './grafana';

jest.mock('@grafana/runtime', () => ({
  __esModule: true,
  ...jest.requireActual('@grafana/runtime'),
  getTemplateSrv: () => ({
    replace: (template: string, scopedVars: ScopedVars, format: string, interpolations: VariableInterpolation[]) => {
      const foundInterpolations = mockedReplaceFnInputOutputMap[template];
      interpolations.push(...(foundInterpolations || []));
      return template;
    },
    getVariables: () => {
      return mockedTypedVariableModels;
    },
  }),
}));

const initialQuery: FalconMetricsQuery = {
  falconParams: {
    affinityId: '%IBM.STATIC011' as AffinityId,
    agentsAndGroups: [{ id: 'agentOrGroupName', name: '*MVS_CICS' }],
    columns: [{ id: 'ORIGINNODE' }, { id: 'FRMSUSEPCT' }, { id: 'APPL_SOCK' }],
    filter: {},
    groupBy: [],
    history: false,
    orderBy: [],
    parmas: [],
    tableId: 'CICSCAD',
  },
  falconVersion: 9,
  hide: false,
  queryType: 'metrics',
  refId: 'A',
};

const initQueryWithFilters = (filter?: MetricsQueryFilters) => {
  return {
    ...initialQuery,
    falconParams: {
      ...initialQuery.falconParams,
      filter: filter || {},
    },
  };
};

const prepareMetricsQuery = (
  query: FalconMetricsQuery,
  tableMd: TableMetadata,
  adHocVariableFilters: AdHocVariableFilter[],
  scopedVars: ScopedVars,
  isVariableRequest: boolean
  // @ts-ignore
) => FalconDatasource.prepareMetricsQuery(query, tableMd, adHocVariableFilters, scopedVars, isVariableRequest);

describe('Process Metrics Query', () => {
  describe('Replace variables in Simple Query', () => {
    it('ScaleFactor Variable in filters', () => {
      const query = initQueryWithFilters({
        nonAggregated: { clause: { columnId: 'FRMSUSEPCT', operator: '=', userDefinedValue: '10' } },
      });

      const processedQuery = prepareMetricsQuery(query, mockedTableMetadata, [], scopedVars, false);

      expect(processedQuery.falconParams.filter.nonAggregated?.clause?.userDefinedValue).toEqual(100);
    });

    it('Enum Variable in filters', () => {
      const query = initQueryWithFilters({
        nonAggregated: { clause: { columnId: 'MGTSTAT', operator: '=', userDefinedValue: 'Isolated' } },
      });

      const processedQuery = prepareMetricsQuery(query, mockedTableMetadata, [], scopedVars, false);

      expect(processedQuery.falconParams.filter.nonAggregated?.clause?.userDefinedValue).toEqual(3);
    });

    it('AdHoc Variable', () => {
      const query = initQueryWithFilters();
      const adHocs = [{ value: 'NonSwap', operator: '=' as FilterOperator, key: 'Management Status', condition: '' }];

      const processedQuery = prepareMetricsQuery(query, mockedTableMetadata, adHocs, scopedVars, false);

      if (
        !processedQuery.falconParams.filter.nonAggregated ||
        !processedQuery.falconParams.filter.nonAggregated.clause
      ) {
        throw new Error('Filters are empty');
      }
      const { columnId, operator, userDefinedValue } = processedQuery.falconParams.filter.nonAggregated.clause;
      expect(columnId).toEqual('MGTSTAT');
      expect(operator).toEqual('=');
      expect(userDefinedValue).toEqual(4);
    });
  });

  describe('Replace variables in Variable Query', () => {
    it('ScaleFactor Variable in filters', () => {
      const query = initQueryWithFilters({
        nonAggregated: { clause: { columnId: 'FRMSUSEPCT', operator: '=', userDefinedValue: '10' } },
      });

      const processedQuery = prepareMetricsQuery(query, mockedTableMetadata, [], scopedVars, true);

      expect(processedQuery.falconParams.filter.nonAggregated?.clause?.userDefinedValue).toEqual(100);
    });

    it('Enum Variable in filters', () => {
      const query = initQueryWithFilters({
        nonAggregated: { clause: { columnId: 'MGTSTAT', operator: '=', userDefinedValue: 'Isolated' } },
      });

      const processedQuery = prepareMetricsQuery(query, mockedTableMetadata, [], scopedVars, true);

      expect(processedQuery.falconParams.filter.nonAggregated?.clause?.userDefinedValue).toEqual(3);
    });

    it('AdHoc Variable (filters should be empty)', () => {
      const query = initQueryWithFilters();
      const adHocs = [{ value: 'NonSwap', operator: '=' as FilterOperator, key: 'Management Status', condition: '' }];

      const processedQuery = prepareMetricsQuery(query, mockedTableMetadata, adHocs, scopedVars, true);

      expect(processedQuery.falconParams.filter.nonAggregated).toBeUndefined();
    });
  });
});
