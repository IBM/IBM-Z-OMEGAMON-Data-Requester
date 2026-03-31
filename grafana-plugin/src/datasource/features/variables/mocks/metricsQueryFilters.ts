import { MetricsQueryFilter, MetricsQueryFilters, MetricsQueryFilterClause } from 'datasource/domain';

import { templateMocks } from './templates';

export const andFilter = [
  {
    clause: {
      columnId: 'SVCCLASS',
      operator: '=',
      userDefinedValue: templateMocks.svcclass,
    },
  },
  {
    clause: {
      columnId: 'STEPNAME',
      operator: '=',
      userDefinedValue: templateMocks.stepname,
    },
  },
] satisfies MetricsQueryFilter[];

export const compoundFilter = {
  nonAggregated: {
    or: [
      {
        clause: {
          columnId: 'JOBNAME',
          operator: '=',
          userDefinedValue: templateMocks.jobname,
        },
      },
      {
        and: andFilter,
      },
    ],
  },
} satisfies MetricsQueryFilters;

export const multiVariablesTemplateFilter = {
  nonAggregated: {
    clause: {
      columnId: 'JOBNAME',
      operator: '=',
      userDefinedValue: templateMocks.multiVariables,
    },
  },
} satisfies MetricsQueryFilters;

export const varNotFoundInDashboardFilter = {
  nonAggregated: {
    clause: {
      columnId: 'JOBNAME',
      operator: '=',
      userDefinedValue: '$VarNotFoundInDashboard',
    },
  },
} satisfies MetricsQueryFilters;

export const singleVarFilter = {
  clause: {
    columnId: 'DB2ID',
    operator: '=',
    userDefinedValue: '${DB2ID}',
  },
} satisfies MetricsQueryFilter;

export const noVarInTemplateFilter = {
  nonAggregated: {
    clause: {
      columnId: 'DB2ID',
      operator: '=',
      userDefinedValue: 'OBC4',
    },
  },
} satisfies MetricsQueryFilters;

export const multiValueClause = {
  columnId: 'SVCCLASS',
  operator: '=',
  userDefinedValue: '${SVCCLASS}',
} satisfies MetricsQueryFilterClause;

export const allValFilter = {
  nonAggregated: {
    clause: {
      columnId: 'VLUNAME',
      operator: '=',
      userDefinedValue: '${VLUNAME}',
    },
  },
} satisfies MetricsQueryFilters;

export const invalidTemplateAllFilter = {
  nonAggregated: {
    clause: {
      columnId: 'VLUNAME',
      operator: '=',
      userDefinedValue: '${VLUNAME}test${VLUNAME}',
    },
  },
} satisfies MetricsQueryFilters;

export const allInAndFilter = {
  nonAggregated: {
    and: [
      {
        clause: {
          columnId: 'VLUNAME',
          operator: '=',
          userDefinedValue: '${VLUNAME}',
        },
      },
      {
        clause: {
          columnId: 'DB2ID',
          operator: '=',
          userDefinedValue: '${DB2ID}',
        },
      },
    ],
  },
} satisfies MetricsQueryFilters;

export const allInMultipleClauseAndFilter = {
  nonAggregated: {
    and: [
      {
        clause: {
          columnId: 'VLUNAME',
          operator: '=',
          userDefinedValue: '${VLUNAME}',
        },
      },
      {
        clause: {
          columnId: 'DB2ID',
          operator: '=',
          userDefinedValue: '${DB2ID}',
        },
      },
      {
        clause: {
          columnId: 'SVCCLASS',
          operator: '=',
          userDefinedValue: 'USSDSYS',
        },
      },
    ],
  },
} satisfies MetricsQueryFilters;

export const allInOrFilter = {
  nonAggregated: {
    or: [
      {
        clause: {
          columnId: 'VLUNAME',
          operator: '=',
          userDefinedValue: '${VLUNAME}',
        },
      },
      {
        clause: {
          columnId: 'DB2ID',
          operator: '=',
          userDefinedValue: '${DB2ID}',
        },
      },
      {
        clause: {
          columnId: 'SVCCLASS',
          operator: '=',
          userDefinedValue: 'USSDSYS',
        },
      },
    ],
  },
} satisfies MetricsQueryFilters;

export const complexAllFilter = {
  nonAggregated: {
    and: [
      {
        clause: {
          columnId: 'JOBNAME',
          operator: '=',
          userDefinedValue: '${JOBNAME}',
        },
      },
      {
        or: [
          {
            clause: {
              columnId: 'VLUNAME',
              operator: '=',
              userDefinedValue: '${VLUNAME}',
            },
          },
          {
            clause: {
              columnId: 'DB2ID',
              operator: '=',
              userDefinedValue: '${DB2ID}',
            },
          },
          {
            clause: {
              columnId: 'SVCCLASS',
              operator: '=',
              userDefinedValue: 'USSDSYS',
            },
          },
        ],
      },
    ],
  },
} satisfies MetricsQueryFilters;

export const customAllFilter = {
  nonAggregated: {
    and: [
      {
        clause: {
          columnId: 'VLUNAME',
          operator: '=',
          userDefinedValue: '${VLUNAME}',
        },
      },
      {
        or: [
          {
            clause: {
              columnId: 'DB2SUBSYSTEM',
              operator: '=',
              userDefinedValue: '${DB2SUBSYSTEM}',
            },
          },
          {
            clause: {
              columnId: 'DB2ID',
              operator: '=',
              userDefinedValue: '${DB2ID}',
            },
          },
          {
            clause: {
              columnId: 'SVCCLASS',
              operator: '=',
              userDefinedValue: 'USSDSYS',
            },
          },
        ],
      },
    ],
  },
} satisfies MetricsQueryFilters;

export const mgtstatClause = {
  columnId: 'MGTSTAT',
  operator: '=',
  userDefinedValue: '$MGTSTAT',
} satisfies MetricsQueryFilterClause;

export const swpstatClause = {
  columnId: 'SWPSTAT',
  operator: '=',
  userDefinedValue: '${SWPSTAT}',
} satisfies MetricsQueryFilterClause;

export const frmsusepctClause = {
  columnId: 'FRMSUSEPCT',
  operator: '=',
  userDefinedValue: '$FRMSUSEPCT',
} satisfies MetricsQueryFilterClause;

export const mgtstatFilter = {
  nonAggregated: {
    clause: mgtstatClause,
  },
} satisfies MetricsQueryFilters;

export const swpstatFilter = {
  nonAggregated: {
    clause: swpstatClause,
  },
} satisfies MetricsQueryFilters;

export const frmsusepctFilter = {
  nonAggregated: {
    clause: frmsusepctClause,
  },
} satisfies MetricsQueryFilters;
