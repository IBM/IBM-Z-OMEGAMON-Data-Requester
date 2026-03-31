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
