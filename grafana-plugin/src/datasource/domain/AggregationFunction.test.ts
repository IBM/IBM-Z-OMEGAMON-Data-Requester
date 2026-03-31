import { extractAggFuncFromFieldName, extractColumnIdFromFieldName } from './AggregationFunction';

describe(extractColumnIdFromFieldName.name, () => {
  test('Field name with aggregation function', () => {
    expect(extractColumnIdFromFieldName('abc(fgh)')).toEqual('fgh');
  });
  test('Field name without aggregation function', () => {
    expect(extractColumnIdFromFieldName('fgh')).toEqual('fgh');
  });
});

describe(extractAggFuncFromFieldName.name, () => {
  test('Field name with known aggregation function', () => {
    expect(extractAggFuncFromFieldName('AVG(fgh)')).toEqual('AVG');
  });
  test('Field name with unknown aggregation function', () => {
    expect(() => extractAggFuncFromFieldName('abc(fgh)')).toThrow(Error);
  });
  test('Field name without aggregation function', () => {
    expect(extractAggFuncFromFieldName('fgh')).toBeNull();
  });
});
