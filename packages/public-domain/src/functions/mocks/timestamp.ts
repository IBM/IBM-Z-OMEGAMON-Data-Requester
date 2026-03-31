// eslint-disable-next-line no-restricted-imports
import { ColumnMetadata } from '../../types';

export const validItmTimestamps = [
  '0230608055952216', // 20th century
  '1230608055952216',
  '1230608044722135',
  '1230608044722133',
  '1230608044722131',
  '1230608044722196',
  '1230603095232971',
  '   1230608054618110  ', // untrimmed
  '2230608054618110', // 22nd century lol
];

export const invalidItmTimestamps = [
  /**
   * See features/format/README.md
   */
  '0000000000000000', // special case
  '230608044723635', // missing century digit as first char
  '123060abcde28656', // letters
  '12306;/-95232971', // symbols
  '123060804472213398', // too long
  '12306030952', // too short
  '', // empty string
];

export const itmTimestampTestValues = [...validItmTimestamps, ...invalidItmTimestamps];

export const timestampColumnMd = {
  attributeName: 'Application_Start_Time',
  defaultSortDirection: 'A',
  description: 'The time and date when this VTAM application was started.',
  extensions: {
    COST: '0',
    NULL: 'N',
    SHARE: 'Y',
    USAGE: 'N',
  },
  id: 'STARTTIME',
  maxLength: 16,
  name: 'Application\nStart\nTime',
  odpName: '',
  sortType: 'lexical',
  type: 'itmTimestamp',
  version: 0,
  atomize: false,
} satisfies ColumnMetadata;
