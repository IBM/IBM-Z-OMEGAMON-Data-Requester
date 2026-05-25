import { tokenize } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { parseOrderByClause } from './parseOrderByClause';

test('should parse items with no order direction', () => {
  const [orderBy] = parseOrderByClause(tokenize('ORDER BY THRUNODE, ORIGINNODE'));

  expect(orderBy?.nodeType).toBe('order_by');
  expect(orderBy?.items).toMatchObject([
    {
      nodeType: 'order_by_expression',
      identifier: { token: { tokenText: 'THRUNODE' } },
    },
    {
      nodeType: 'order_by_expression',
      identifier: { token: { tokenText: 'ORIGINNODE' } },
    },
  ]);
});

test('should parse order direction', () => {
  const [orderBy] = parseOrderByClause(tokenize('ORDER BY INODESTS ASC'));

  expect(orderBy?.nodeType).toBe('order_by');
  expect(orderBy?.items?.[0]?.direction?.kind).toBe('asc_order_direction');
});

test('should parse aggregation functions in order by', () => {
  const [orderBy] = parseOrderByClause(tokenize('ORDER BY SUM(MAXPCT) DESC, AVG(CPU_USAGE) ASC'));

  expect(orderBy?.nodeType).toBe('order_by');
  expect(orderBy?.items).toHaveLength(2);

  expect(orderBy?.items?.[0]).toMatchObject({
    nodeType: 'order_by_expression',
    functionCall: {
      nodeType: 'function_call',
      funcIdentifier: { token: { tokenText: 'SUM' } },
      args: [{ token: { tokenText: 'MAXPCT' } }],
    },
    direction: { kind: 'desc_order_direction' },
  });

  expect(orderBy?.items?.[1]).toMatchObject({
    nodeType: 'order_by_expression',
    functionCall: {
      nodeType: 'function_call',
      funcIdentifier: { token: { tokenText: 'AVG' } },
      args: [{ token: { tokenText: 'CPU_USAGE' } }],
    },
    direction: { kind: 'asc_order_direction' },
  });
});
