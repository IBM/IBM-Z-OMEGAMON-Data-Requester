import { ColumnMetadata } from 'public-domain';

export const numberCasesAsNumbers = [-123, -1, 0, 1, 10, 123, 72491];
export const numberCasesAsStrings = ['0', '000123', '0xA', '0X01F'];
export const numberCasesAsNumbersAndAsStrings = [...numberCasesAsNumbers, ...numberCasesAsStrings];
export const brokenNumberCasesAsStrings = [
  'hello',
  'O',
  'Ox0',
  '0xO',
  '-seven',
  '0xABSENCE',
  '0xABCDEFG',
  ',.;[]',
  ';.123',
  '0x<>',
];

const columnMdWithUnits = {
  attributeName: 'User\\Process\\Time',
  defaultSortDirection: 'A',
  description:
    'The total user CPU time, in seconds and microseconds, used by the database manager agent process, the unit of work, or the statement.',
  extensions: {
    NULL: 'N',
    OPTION: 'SORTBYINTERNAL',
    PARM: "H'14',H'00',H'0004',C'C31 ',F'0284'",
    SHARE: 'Y',
    UNITS: 'milliseconds',
    STRUCT: 'DB2_CONNECT_TASKLIST',
    MEMBER: 'EESTL004',
    RANGE: '1-99999999',
  },
  id: 'EESTL004',
  maxLength: 4,
  name: 'User\nProcess\nTime',
  odpName: '',
  sortType: 'lexical',
  type: 'number',
  version: 0,
  unit: 'milliseconds',
  atomize: false,
} satisfies ColumnMetadata;

const columnMdWithoutPrintfWithoutScaleFactor = {
  attributeName: 'Uniqueness\\Value2',
  defaultSortDirection: 'A',
  description: 'The DB2 thread uniqueness value.',
  extensions: {
    MEMBER: 'Uniqueness_Value2',
    NULL: 'N',
    PARM: "H'14',H'00',H'0002',C'C31 ',F'0428'",
    RANGE: '1-999',
    SHARE: 'Y',
    STRUCT: 'ALL_THREADS',
    TEXT: 'UNIQUENESS VALUE',
  },
  id: 'QWHSLUUV2',
  maxLength: 2,
  name: 'Uniqueness\nValue2',
  odpName: '',
  sortType: 'lexical',
  type: 'number',
  version: 0,
  atomize: false,
} satisfies ColumnMetadata;

const columnMdWithoutPrintfWithScaleFactor = {
  attributeName: 'Read_Hit\\Percent',
  defaultSortDirection: 'A',
  description: 'The percentage of READ requests that were satisfied from cache.',
  scaleFactor: 2,
  extensions: {},
  id: 'RD_TOT_HP',
  maxLength: 4,
  name: 'Read Hit\nPercent',
  odpName: '',
  sortType: 'lexical',
  type: 'number',
  version: 0,
  atomize: false,
} satisfies ColumnMetadata;

const columnMdWithNonHexPrintfWithScaleFactor = {
  attributeName: 'Read_Hit\\Percent',
  defaultSortDirection: 'A',
  description: 'The percentage of READ requests that were satisfied from cache.',
  scaleFactor: 1,
  printf: '"%5.1f"',
  extensions: {
    RANGE: '0-1000',
    SHARE: 'Y',
    UNITS: '".1 %"',
    USAGE: 'N',
  },
  id: 'RD_TOT_HP',
  maxLength: 4,
  name: 'Read Hit\nPercent',
  odpName: '',
  sortType: 'lexical',
  type: 'number',
  version: 0,
  atomize: false,
} satisfies ColumnMetadata;

/**
 * Possible cases (at least in theory):
 * 1. no printf, no scaleFactor
 * 2. nonHexPrintf, no scaleFactor
 * 3. no printf, scaleFactor
 * 4. nonHexPrintf, scaleFactor
 */

export const columnMdsWithoutHexPrintf: ColumnMetadata[] = [
  columnMdWithoutPrintfWithScaleFactor,
  columnMdWithoutPrintfWithoutScaleFactor,
  columnMdWithNonHexPrintfWithScaleFactor,
  columnMdWithUnits,
];

export const columnMdsWithPrintf: ColumnMetadata[] = [columnMdWithNonHexPrintfWithScaleFactor];

export const numberColumnMds: ColumnMetadata[] = [...columnMdsWithoutHexPrintf];
