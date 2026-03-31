import { ColumnMetadata, ColumnMetadataMap, TableMetadata, AffinityId } from 'public-domain';

import { mockedApplicationMetadatas } from 'datasource/features/metadata/mocks';

import { MetricsQueryToCmsSqlTests } from './types';

const inodestsMetadata = {
  applicationCode: 'O4SRV',
  id: 'INODESTS',
  columns: {
    AFFINITIES: { id: 'AFFINITIES', type: 'string' } as ColumnMetadata,
    EXPIRYTIME: { id: 'EXPIRYTIME', type: 'number' } as ColumnMetadata,
  } as ColumnMetadataMap,
} as TableMetadata;

const realthdaMetadata = {
  applicationCode: 'KDP',
  id: 'REALTHDA',
  columns: {
    ORIGINNODE: { id: 'ORIGINNODE', type: 'string' } as ColumnMetadata,
  } as ColumnMetadataMap,
} as TableMetadata;

const db2connMetadata = {
  applicationCode: 'KDP',
  id: 'DB2CONN',
  columns: {
    EESGD028: { id: 'EESGD028', type: 'number' } as ColumnMetadata,
  } as ColumnMetadataMap,
} as TableMetadata;

const reqularQueryTests: MetricsQueryToCmsSqlTests = {
  validMetricsQueries: [
    {
      name: 'SELECT FROM clause',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
          },
        ],
        agentsAndGroups: [],
        filter: {},
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput: 'SELECT AFFINITIES FROM O4SRV.INODESTS;',
    },
    {
      name: 'multiple SELECT FROM clause',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
          },
          {
            id: 'EXPIRYTIME',
          },
        ],
        agentsAndGroups: [],
        filter: {},
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput: 'SELECT AFFINITIES, EXPIRYTIME FROM O4SRV.INODESTS;',
    },
    {
      name: "WHERE clause with SYSTEM.PARMA('NODELIST') array",
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: 'REALTHDA',
        columns: [
          {
            id: 'ORIGINNODE',
          },
        ],
        agentsAndGroups: [
          { id: 'agentOrGroupName', name: 'IC1A:RSD1:DB2' },
          { id: 'agentOrGroupName', name: 'ICA4:RSD1:DB2' },
        ],
        filter: {},
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      metadata: realthdaMetadata,
      applications: mockedApplicationMetadatas,
      expectedOutput:
        "SELECT ORIGINNODE FROM KDP.REALTHDA WHERE SYSTEM.PARMA('NODELIST', 'IC1A:RSD1:DB2, ICA4:RSD1:DB2', 28);",
    },
    {
      name: 'Aggregation function',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
            aggregationFunction: 'MAX',
          },
        ],
        agentsAndGroups: [],
        filter: {},
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput: 'SELECT MAX(AFFINITIES) FROM O4SRV.INODESTS;',
    },
    {
      name: 'HISTORY',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
          },
        ],
        history: true,
        agentsAndGroups: [],
        filter: {},
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput: 'SELECT AFFINITIES FROM O4SRV.INODESTS HISTORY();',
    },
    {
      name: 'ORDER BY',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
          },
        ],
        orderBy: [
          {
            columnId: 'AFFINITIES',
            type: 'DESC',
          },
        ],
        agentsAndGroups: [],
        filter: {},
        history: false,
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput: 'SELECT AFFINITIES FROM O4SRV.INODESTS ORDER BY AFFINITIES DESC;',
    },
    {
      name: 'Multiple ORDER BY',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
          },
          {
            id: 'EXPIRYTIME',
          },
        ],
        orderBy: [
          {
            columnId: 'AFFINITIES',
            type: 'DESC',
          },
          {
            columnId: 'EXPIRYTIME',
            type: 'ASC',
          },
        ],
        agentsAndGroups: [],
        filter: {},
        history: false,
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput: 'SELECT AFFINITIES, EXPIRYTIME FROM O4SRV.INODESTS ORDER BY AFFINITIES DESC, EXPIRYTIME ASC;',
    },
    {
      name: 'Multiple GROUP BY',
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: 'REALTHDA',
        columns: [
          {
            id: 'ORIGINNODE',
          },
          {
            id: 'TIMESTAMP',
          },
        ],
        groupBy: ['ORIGINNODE', 'TIMESTAMP'],
        agentsAndGroups: [],
        filter: {},
        history: false,
        orderBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: realthdaMetadata,
      expectedOutput: 'SELECT ORIGINNODE, TIMESTAMP FROM KDP.REALTHDA GROUP BY ORIGINNODE, TIMESTAMP;',
    },
    {
      name: 'One parma',
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: 'REALTHDA',
        columns: [
          {
            id: 'ORIGINNODE',
          },
        ],
        parmas: [
          {
            name: 'IGNOREFILTER',
            value: 'r',
            length: 1,
          },
        ],
        agentsAndGroups: [],
        filter: {},
        history: false,
        orderBy: [],
        groupBy: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: realthdaMetadata,
      expectedOutput: "SELECT ORIGINNODE FROM KDP.REALTHDA WHERE SYSTEM.PARMA('IGNOREFILTER', 'r', 1);",
    },
    {
      name: 'Multiple parmas',
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: 'REALTHDA',
        columns: [
          {
            id: 'ORIGINNODE',
          },
        ],
        parmas: [
          {
            name: 'IGNOREFILTER',
            value: 'r',
            length: 1,
          },
          {
            name: 'ORIGINNODE',
            value: 'IZSME:LZ',
            length: 8,
          },
        ],
        agentsAndGroups: [],
        filter: {},
        history: false,
        orderBy: [],
        groupBy: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: realthdaMetadata,
      expectedOutput:
        "SELECT ORIGINNODE FROM KDP.REALTHDA WHERE SYSTEM.PARMA('IGNOREFILTER', 'r', 1) AND SYSTEM.PARMA('ORIGINNODE', 'IZSME:LZ', 8);",
    },
    {
      name: 'One parma with just name',
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: 'REALTHDA',
        columns: [
          {
            id: 'ORIGINNODE',
          },
        ],
        parmas: [
          {
            name: 'ORIGINNODE',
          },
        ],
        agentsAndGroups: [],
        filter: {},
        history: false,
        orderBy: [],
        groupBy: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: realthdaMetadata,
      expectedOutput: "SELECT ORIGINNODE FROM KDP.REALTHDA WHERE SYSTEM.PARMA('ORIGINNODE');",
    },
    {
      name: 'Parmas without length',
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: 'REALTHDA',
        columns: [
          {
            id: 'ORIGINNODE',
          },
        ],
        parmas: [
          {
            name: 'IGNOREFILTER',
            value: 'r',
          },
        ],
        agentsAndGroups: [],
        filter: {},
        history: false,
        orderBy: [],
        groupBy: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: realthdaMetadata,
      expectedOutput: "SELECT ORIGINNODE FROM KDP.REALTHDA WHERE SYSTEM.PARMA('IGNOREFILTER', 'r');",
    },
    {
      name: 'First',
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: 'REALTHDA',
        columns: [
          {
            id: 'ORIGINNODE',
          },
        ],
        first: 5,
        agentsAndGroups: [],
        filter: {},
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
      },
      applications: mockedApplicationMetadatas,
      metadata: realthdaMetadata,
      expectedOutput: 'SELECT ORIGINNODE FROM KDP.REALTHDA WHERE FIRST(5);',
    },
    {
      name: 'single filter',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
          },
        ],
        filter: {
          nonAggregated: {
            clause: {
              columnId: 'AFFINITIES',
              operator: '=',
              userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
            },
          },
        },
        agentsAndGroups: [],
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput: "SELECT AFFINITIES FROM O4SRV.INODESTS WHERE AFFINITIES = '%IBM.CICSplex 00000000050000yA043';",
    },
    {
      name: 'Filter with numeric value',
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: 'DB2CONN',
        columns: [
          {
            id: 'EESGD028',
          },
        ],
        filter: {
          nonAggregated: {
            clause: {
              columnId: 'EESGD028',
              operator: '>',
              userDefinedValue: '0',
            },
          },
        },
        agentsAndGroups: [],
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: db2connMetadata,
      expectedOutput: 'SELECT EESGD028 FROM KDP.DB2CONN WHERE EESGD028 > 0;',
    },
    {
      name: 'Filter with variable value for column of "number" type',
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: 'DB2CONN',
        columns: [
          {
            id: 'EESGD028',
          },
        ],
        filter: {
          nonAggregated: {
            clause: {
              columnId: 'EESGD028',
              operator: '>',
              userDefinedValue: '$VARIABLE',
            },
          },
        },
        agentsAndGroups: [],
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: db2connMetadata,
      expectedOutput: 'SELECT EESGD028 FROM KDP.DB2CONN WHERE EESGD028 > $VARIABLE;',
    },
    {
      name: 'Filter with variable value for column of "string" type',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
          },
        ],
        filter: {
          nonAggregated: {
            clause: {
              columnId: 'AFFINITIES',
              operator: '=',
              userDefinedValue: '$VARIABLE',
            },
          },
        },
        agentsAndGroups: [],
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput: "SELECT AFFINITIES FROM O4SRV.INODESTS WHERE AFFINITIES = '$VARIABLE';",
    },
    {
      name: 'OR filter',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
          },
        ],
        filter: {
          nonAggregated: {
            or: [
              {
                clause: {
                  columnId: 'AFFINITIES',
                  operator: '=',
                  userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
                },
              },
              {
                clause: {
                  columnId: 'AFFINITIES',
                  operator: '=',
                  userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
                },
              },
            ],
          },
        },
        agentsAndGroups: [],
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput:
        "SELECT AFFINITIES FROM O4SRV.INODESTS WHERE (AFFINITIES = '%IBM.CICSplex 00000000050000yA043' OR AFFINITIES = '%IBM.CICSplex 00000000050000yA022');",
    },
    {
      name: 'AND filter',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
          },
          {
            id: 'EXPIRYTIME',
          },
        ],
        filter: {
          nonAggregated: {
            and: [
              {
                clause: {
                  columnId: 'AFFINITIES',
                  operator: '=',
                  userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
                },
              },
              {
                clause: {
                  columnId: 'EXPIRYTIME',
                  operator: '=',
                  userDefinedValue: '9',
                },
              },
            ],
          },
        },
        agentsAndGroups: [],
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput:
        "SELECT AFFINITIES, EXPIRYTIME FROM O4SRV.INODESTS WHERE (AFFINITIES = '%IBM.CICSplex 00000000050000yA043' AND EXPIRYTIME = 9);",
    },
    {
      name: 'OR filter inside AND',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
          },
        ],
        filter: {
          nonAggregated: {
            and: [
              {
                clause: {
                  columnId: 'AFFINITIES',
                  operator: '=',
                  userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
                },
              },
              {
                or: [
                  {
                    clause: {
                      columnId: 'AFFINITIES',
                      operator: '=',
                      userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
                    },
                  },
                  {
                    clause: {
                      columnId: 'AFFINITIES',
                      operator: '=',
                      userDefinedValue: '%IBM.CICSplex 00000000050000yA033',
                    },
                  },
                ],
              },
            ],
          },
        },
        agentsAndGroups: [],
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput:
        "SELECT AFFINITIES FROM O4SRV.INODESTS WHERE (AFFINITIES = '%IBM.CICSplex 00000000050000yA043' AND (AFFINITIES = '%IBM.CICSplex 00000000050000yA043' OR AFFINITIES = '%IBM.CICSplex 00000000050000yA033'));",
    },
    {
      name: 'SYSTEM.PARMA Only nodelist',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
          },
        ],
        filter: {},
        agentsAndGroups: [
          { id: 'agentOrGroupName', name: '*MVS_TEST' },
          { id: 'agentOrGroupName', name: 'SECOND_ON' },
        ],
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput:
        "SELECT AFFINITIES FROM O4SRV.INODESTS WHERE SYSTEM.PARMA('NODELIST', '*MVS_TEST, SECOND_ON', 20);",
    },
    {
      name: 'SYSTEM.PARMA Nodelist and standart parma',
      queryParams: {
        affinityId: '%IBM.ITM_INTERNAL' as AffinityId,
        tableId: 'INODESTS',
        columns: [
          {
            id: 'AFFINITIES',
          },
        ],
        filter: {},
        agentsAndGroups: [
          { id: 'agentOrGroupName', name: '*MVS_TEST' },
          { id: 'agentOrGroupName', name: 'SECOND_ON' },
        ],
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [
          {
            name: 'PARMA',
            value: 'Second',
            length: 6,
          },
        ],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: inodestsMetadata,
      expectedOutput:
        "SELECT AFFINITIES FROM O4SRV.INODESTS WHERE SYSTEM.PARMA('PARMA', 'Second', 6) AND SYSTEM.PARMA('NODELIST', '*MVS_TEST, SECOND_ON', 20);",
    },
  ],
  invalidMetricsQueries: [
    {
      name: 'applicationCode provided but no tableId',
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: '',
        columns: [],
        filter: {},
        history: false,
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
        agentsAndGroups: [],
      },
      applications: mockedApplicationMetadatas,
      metadata: realthdaMetadata,
      expectedOutput: 'SELECT  FROM KDP.;',
    },
    {
      name: 'applicationCode, agentsAndGroups but no tableId is provided',
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: '',
        columns: [],
        agentsAndGroups: [
          { id: 'agentOrGroupName', name: '*MVS_TEST' },
          { id: 'agentOrGroupName', name: 'SECOND_ON' },
        ],
        history: false,
        filter: {},
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: null,
      expectedOutput: "SELECT  FROM KDP. WHERE SYSTEM.PARMA('NODELIST', '*MVS_TEST, SECOND_ON', 20);",
    },
    {
      name: 'applicationCode and tableId but no columns is provided',
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: 'REALTHDA',
        columns: [],
        agentsAndGroups: [],
        history: false,
        filter: {},
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: realthdaMetadata,
      expectedOutput: 'SELECT  FROM KDP.REALTHDA;',
    },
    {
      name: 'no column found in table metadata',
      queryParams: {
        affinityId: '%IBM.STATIC017' as AffinityId,
        tableId: 'REALTHDA',
        columns: [
          {
            id: 'INCORRECT_ID',
          },
        ],
        agentsAndGroups: [],
        history: false,
        filter: {
          nonAggregated: {
            clause: {
              columnId: 'INCORRECT_ID',
              operator: '=',
              userDefinedValue: '$VARIABLE',
            },
          },
        },
        orderBy: [],
        groupBy: [],
        parmas: [],
        first: 0,
      },
      applications: mockedApplicationMetadatas,
      metadata: realthdaMetadata,
      expectedOutput: `SELECT INCORRECT_ID FROM KDP.REALTHDA WHERE INCORRECT_ID = '$VARIABLE';`,
    },
    {
      name: 'Filter clause input not convertable to number',
      queryParams: {
        affinityId: '%IBM.STATIC007' as AffinityId,
        tableId: 'ASCPUUTIL',
        columns: [
          {
            id: 'ORIGINNODE',
            aggregationFunction: 'COUNT',
          },
          {
            id: 'ASID',
          },
        ],
        agentsAndGroups: [
          {
            id: 'agentOrGroupName',
            name: 'RSPLUI01:RS25:MVSSYS',
          },
          {
            id: 'agentOrGroupName',
            name: '*MVS_SYSTEM',
          },
        ],
        filter: {
          nonAggregated: {
            clause: {
              columnId: 'Type',
              operator: '<>',
              userDefinedValue: '6dtgfd',
            },
          },
        },
        parmas: [],
        history: false,
        groupBy: ['ASID'],
        orderBy: [],
      },
      applications: mockedApplicationMetadatas,
      metadata: realthdaMetadata,
      expectedOutput: `SELECT COUNT(ORIGINNODE), ASID FROM KM5.ASCPUUTIL WHERE Type <> '6dtgfd' AND SYSTEM.PARMA('NODELIST', 'RSPLUI01:RS25:MVSSYS, *MVS_SYSTEM', 33) GROUP BY ASID;`,
    },
  ],
};

export default reqularQueryTests;
