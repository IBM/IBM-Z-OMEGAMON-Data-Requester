import { EnumMap, ColumnMetadata, TableMetadata } from 'public-domain';

import { formatEnumKeysInTableMd, formatEnumKeysInColumnMd } from './formatEnumKeys';

const unformattedEnums: EnumMap = {
  '-12345': 'bla1',
  '0': 'bla2',
  '000001': 'bla3',
  '123123': 'bla4',
  '0x123': 'bla5',
  '0X000ABCDEF': 'bla6',
};

interface EnumKeyFormattingTestCase {
  description: string;
  unformattedColumnMd: ColumnMetadata;
  formattedColumnMd: ColumnMetadata;
}

const testCases: EnumKeyFormattingTestCase[] = [
  {
    description: 'formats numeric enum keys into decimal numbers, when type is number and no PRINTF',
    unformattedColumnMd: {
      type: 'number',
      enums: unformattedEnums,
    } as ColumnMetadata,
    formattedColumnMd: {
      type: 'number',
      enums: {
        '-12345': 'bla1',
        '0': 'bla2',
        '1': 'bla3',
        '123123': 'bla4',
        '291': 'bla5',
        '11259375': 'bla6',
      } as EnumMap,
    } as ColumnMetadata,
  },
  {
    description:
      'formats numeric enum keys to have fraction digits after dot, when type is number and no/non-hex PRINTF and scaleFactor provided',
    unformattedColumnMd: {
      type: 'number',
      printf: '"%5.1f"',
      scaleFactor: 3,
      enums: unformattedEnums,
    } as ColumnMetadata,
    formattedColumnMd: {
      type: 'number',
      printf: '"%5.1f"',
      scaleFactor: 3,
      enums: {
        '-12.345': 'bla1',
        '0': 'bla2',
        '0.001': 'bla3',
        '123.123': 'bla4',
        '0.291': 'bla5',
        '11259.375': 'bla6',
      } as EnumMap,
    } as ColumnMetadata,
  },
  {
    description: 'formats numeric enum keys into hex numbers, when type is number and hex PRINTF',
    unformattedColumnMd: {
      type: 'number',
      printf: "'%06X'",
      enums: unformattedEnums,
    } as ColumnMetadata,
    formattedColumnMd: {
      type: 'number',
      printf: "'%06X'",
      enums: {
        '-12345': 'bla1',
        '0': 'bla2',
        '1': 'bla3',
        '123123': 'bla4',
        '291': 'bla5',
        '11259375': 'bla6',
      } as EnumMap,
    } as ColumnMetadata,
  },
];

describe(formatEnumKeysInTableMd.name, () => {
  const columnMdEntriesWithUnformattedEnumKeys = testCases.map<[string, ColumnMetadata]>((testCase, idx) => {
    return [`${idx}`, testCase.unformattedColumnMd];
  });
  const columnMdMapWithUnformattedEnumKeys = Object.fromEntries(columnMdEntriesWithUnformattedEnumKeys);
  const tableMdWithUnformattedEnumKeys = {
    columns: columnMdMapWithUnformattedEnumKeys,
  } as TableMetadata;

  const columnMdEntriesWithFormattedEnumKeys = testCases.map<[string, ColumnMetadata]>((testCase, idx) => {
    return [`${idx}`, testCase.formattedColumnMd];
  });
  const columnMdMapWithFormattedEnumKeys = Object.fromEntries(columnMdEntriesWithFormattedEnumKeys);
  const tableMdWithFormattedEnumKeys = {
    columns: columnMdMapWithFormattedEnumKeys,
  } as TableMetadata;

  it('should format enum keys in column metadata for each column in table', () => {
    expect(formatEnumKeysInTableMd(tableMdWithUnformattedEnumKeys)).toEqual(tableMdWithFormattedEnumKeys);
  });
});

describe(formatEnumKeysInColumnMd.name, () => {
  testCases.forEach((testCase) => {
    it(testCase.description, () => {
      expect(formatEnumKeysInColumnMd(testCase.unformattedColumnMd)).toEqual(testCase.formattedColumnMd);
    });
  });
});
