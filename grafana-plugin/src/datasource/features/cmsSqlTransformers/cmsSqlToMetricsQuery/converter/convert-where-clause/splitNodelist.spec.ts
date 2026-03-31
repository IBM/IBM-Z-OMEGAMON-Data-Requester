import { splitNodelist } from './splitNodelist';

test('should return input for a single originnode', () => {
  expect(splitNodelist('ORIGIN:NODE:DB2')).toEqual(['ORIGIN:NODE:DB2']);
});

test('should return input for a single function call', () => {
  expect(splitNodelist('@GetMvsOriginode(RS25)')).toEqual(['@GetMvsOriginode(RS25)']);
});

test('should ignore commas in function calls', () => {
  expect(splitNodelist('@GetMvsOriginode(RS25,RS27)')).toEqual(['@GetMvsOriginode(RS25,RS27)']);
});

test('should split items by comma', () => {
  expect(splitNodelist('Item1,@Func2(RS25,RS27), Item3,  @Func3(RS555,   Rs3)   ,    Item4    ')).toEqual([
    'Item1',
    '@Func2(RS25,RS27)',
    'Item3',
    '@Func3(RS555,   Rs3)',
    'Item4',
  ]);
});

test('should ignore unmatched closing bracket', () => {
  expect(splitNodelist('failed)function,call')).toEqual(['failed)function', 'call']);
});

test('should return empty array for empty input', () => {
  expect(splitNodelist('')).toEqual([]);
});

test('should return empty array for whitespace only input', () => {
  expect(splitNodelist('      ')).toEqual([]);
});

test('should ignore empty items', () => {
  expect(splitNodelist(',,,, ,,,   ,,')).toEqual([]);
});
