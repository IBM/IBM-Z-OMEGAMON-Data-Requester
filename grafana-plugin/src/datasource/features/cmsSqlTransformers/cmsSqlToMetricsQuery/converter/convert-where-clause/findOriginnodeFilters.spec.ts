import { assert } from 'public-common';
import { ColumnMetadataMap } from 'public-domain';

import { TokenMapping } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter/internals';
import { parseSelectStatement } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';
import { tokenize } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { buildIntermediateRepresentation } from './buildIntermediateRepresentation';
import { OriginnodesExtractionResult, findOriginnodeFilters } from './findOriginnodeFilters';
import { IntermediateFilter } from './intermediateFilter';

const fakeColumnMetadataMap = {
  COL1: { id: 'COL1', type: 'number' },
  COL2: { id: 'COL2', type: 'number' },
  COL3: { id: 'COL3', type: 'number' },
  COL4: { id: 'COL4', type: 'number' },
  COL5: { id: 'COL5', type: 'number' },
  COL6: { id: 'COL6', type: 'number' },
  COL7: { id: 'COL7', type: 'number' },
  ORIGINNODE: { id: 'ORIGINNODE', type: 'string' },
} as unknown as ColumnMetadataMap;

function getRootOfWhere(filterStr: string): IntermediateFilter {
  const { statement } = parseSelectStatement(tokenize(`SELECT C FROM A.T WHERE ${filterStr}`));
  const where = statement?.where;
  assert(where);
  return buildIntermediateRepresentation(where.filter);
}

function originnodesFromWhere(filterStr: string): OriginnodesExtractionResult {
  const root = getRootOfWhere(filterStr);
  return findOriginnodeFilters(root, new TokenMapping(), fakeColumnMetadataMap);
}

test('Returns empty set if there is no ORIGINNODE filter', () => {
  const { commonNode: commonFilterNode, originnodes } = originnodesFromWhere('ITMSKS > 0');
  expect(commonFilterNode).toBeNull();
  expect(originnodes).toHaveLength(0);
});

test('Returns root as commonFilterNode if ORIGINNODE is the only filter', () => {
  const root = getRootOfWhere("ORIGINNODE = 'TEST'");
  const { commonNode: commonFilterNode, originnodes } = findOriginnodeFilters(
    root,
    new TokenMapping(),
    fakeColumnMetadataMap
  );
  expect(commonFilterNode).toBe(root);
  expect(originnodes).toHaveLength(1);
  expect(originnodes).toContain('TEST');
});

test('Detects ORIGINNODE filter no matter the case', () => {
  const root = getRootOfWhere("ORIGINNODE = 'TEST1' or originnode='test2' Or OriginNode = 'Test3'");
  const { originnodes } = findOriginnodeFilters(root, new TokenMapping(), fakeColumnMetadataMap);
  expect(originnodes).toHaveLength(3);
  expect(originnodes).toContain('TEST1');
  expect(originnodes).toContain('test2');
  expect(originnodes).toContain('Test3');
});

test('Returns root as commonFilterNode if there is no filters other than several ORIGINNODEs', () => {
  const root = getRootOfWhere("ORIGINNODE = 'TEST1' OR  ORIGINNODE = 'TEST2' OR ORIGINNODE = 'TEST3'");
  const { commonNode: commonFilterNode, originnodes } = findOriginnodeFilters(
    root,
    new TokenMapping(),
    fakeColumnMetadataMap
  );
  expect(commonFilterNode).toBe(root);
  expect(originnodes).toHaveLength(3);
});

test('Return ORIGINNODE connected with non-ORIGINNODE filters via AND', () => {
  const { commonNode: commonFilterNode, originnodes } = originnodesFromWhere("ITMSKS > 0 AND ORIGINNODE = 'TEST'");
  expect(commonFilterNode).not.toBeNull();
  expect(originnodes).toHaveLength(1);
  expect(originnodes).toContain('TEST');
});

test('Throws if ORIGINNODE filters are connected via AND', () => {
  expect(() => originnodesFromWhere("ORIGINNODE = 'TEST1' AND ORIGINNODE = 'TEST2'")).toThrowError(
    'Unexpected appearance of ORIGINNODE filter'
  );
});

test('Throws if connected with non-ORIGINNODE filter via OR', () => {
  expect(() => originnodesFromWhere("ORIGINNODE='TEST' OR ITMSKS=3")).toThrowError(
    'Mixing ORIGINNODE and non-ORIGINNODE filters is not allowed'
  );

  expect(() => originnodesFromWhere("ORIGINNODE='TEST' OR (ITMSKS<>3 AND ITMSKS<>5)")).toThrowError(
    'Mixing ORIGINNODE and non-ORIGINNODE filters is not allowed'
  );
});

test('Throws if connected with AND on non-root level', () => {
  expect(() => originnodesFromWhere("(ORIGINNODE = 'TEST1' AND ORIGINNODE = 'TEST2') OR ITMSKS=1")).toThrowError(
    'Unexpected appearance of ORIGINNODE filter'
  );
});

test('Throws if connected with OR on too deep level', () => {
  expect(() =>
    originnodesFromWhere("((ORIGINNODE = 'TEST1' OR ORIGINNODE = 'TEST2') AND ITMSKS=1) OR ITMSKS<>1")
  ).toThrowError('Unexpected appearance of ORIGINNODE filter');
});

test('Throws if ORIGINNODE filters are placed in two separate connectors', () => {
  expect(() =>
    originnodesFromWhere(
      "(ORIGINNODE = 'TEST1' OR ORIGINNODE = 'TEST2') AND (ORIGINNODE = 'TEST3' OR ORIGINNODE = 'TEST4')"
    )
  ).toThrowError('Unexpected appearance of ORIGINNODE filter');
});

test('Throws if used wrong comparison operator', () => {
  expect(() => originnodesFromWhere("ORIGINNODE <> 'TEST'")).toThrowError(
    'Only "equal to" operator is allowed in ORIGINNODE filters'
  );
});
