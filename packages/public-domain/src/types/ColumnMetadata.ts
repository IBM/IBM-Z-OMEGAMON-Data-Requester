export const KNOWN_COLUMN_TYPES = ['string', 'number', 'itmTimestamp', 'timestamp'] as const; //rawDataType TODO find all possible values

export type EnumMap = Record<string | number, string | number>;

export function findEnumValue(enumMap: EnumMap, value: string | number): string | number | undefined {
  switch (typeof value) {
    case 'string': {
      let enumValue = enumMap[value];
      if (enumValue === undefined) {
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
          enumValue = enumMap[parsedValue];
        }
      }
      return enumValue;
    }
    case 'number': {
      let enumValue = enumMap[value];
      if (enumValue === undefined) {
        enumValue = enumMap[value.toString()];
      }
      return enumValue;
    }
  }
}

export type Unit = (typeof TIME_UNITS)[number] | (typeof UNCATEGORISED_UNITS)[number];
export const RESTRICTED_COLUMN_USAGE = ['info', 'hidden', 'reserved'] as const;
type Usage = (typeof RESTRICTED_COLUMN_USAGE)[number];

export interface ColumnMetadata {
  id: string; //columnIdentifier
  name: string; //longColumnLabel
  attributeName: string; //extensions.ATTRIBUTE_NAME
  odpName?: string; // to be added in future
  description: string; //columnDescription
  type: (typeof KNOWN_COLUMN_TYPES)[number]; //rawDataType
  maxLength: number; //rawDataTypeLength
  scaleFactor?: number; // how many digits should be moved behind dot (e.g. val=98765, SF=3 => formattedVal=98.765)
  precision?: number; // what's the limit of fraction digits after dot (e.g. val=12.345, P=1 => formattedVal=12.3)
  printf?: string; // formatting info
  atomize: boolean; //ATOMIZE for displayItem
  version: number; // agent version
  sortType: 'lexical'; //sortType TODO find all possible values
  defaultSortDirection: 'A'; //defaultSortDirection TODO find all possible values
  enums?: EnumMap; //displayHints
  extensions: Record<string, string>; // See example below
  unit?: Unit;
  usage?: Usage;
}

export const WRITETIME_COLUMN_ID = 'WRITETIME';

export const writetimeColumnMetadata: ColumnMetadata = {
  id: WRITETIME_COLUMN_ID,
  name: 'Recording time',
  description: '',
  attributeName: WRITETIME_COLUMN_ID,
  type: 'timestamp',
  maxLength: 16,
  defaultSortDirection: 'A',
  atomize: true,
  version: 0,
  sortType: 'lexical',
  extensions: { 'com.rs.ctds_common': 'HISTORICALTIMESTAMP' },
};

/**
 * ColumnMetadata.extensions e.g.
 * extensions: {
 *   AGPRF: 'MIN',
 *   BEHAV: 'GAUGE',
 *   COST: '0',
 *   EMITTER: 'KDFECEMT',
 *   NLSID: '259330',
 *   NULL: 'N',
 *   OPTION: 'ALIGNRIGHT',
 *   PARM: "H'22',X'01',X'01',X'01',X'04',C'C31 ',H'0',H'48',C'C31 ',H'0',H'0'",
 *   RANGE: '0-1000',
 *   SHARE: 'Y',
 *   UNITS: '".1 %"',
 *   USAGE: 'N',
 * },
 */

// TODO Maybe units should be a seperate file
export const TIME_UNITS = [
  'seconds',
  'milliseconds',
  'centiseconds',
  'microseconds',
  'minutes',
  'Seconds',
  'Minutes',
  '.000001 of a second',
  '.1 Milliseconds',
  'centihours',
] as const;

export const UNCATEGORISED_UNITS = [
  'MVS SMF ID',
  'percent',
  '', // TODO Units can also have empty string, should I have it here?
  'Total Number of Connections',
  'kilobytes',
  'rate per minute',
  'Number of Sessions defined',
  'Number of Sessions in Use',
  'Percent of Sessions in Use',
  'Number of Send Sessions Defined',
  'Number of Send Sessions in Use',
  'Percent of Send Sessions in Use',
  'Number of Receive Sessions Defined',
  'Number of Receive Sessions in Use',
  'Percent of Receive Sessions in use',
  'Rate of Send Session Allocates',
  'Count of Send Session Allocates',
  'Rate of Receive Session Allocates',
  'Count of Receive Session Allocates',
  'Tasks queued waiting for a session',
  'Maximum number of tasks that can be queued',
  'KBytes',
  'Percent',
  'percentage',
  'rate per second',
  'STCK',
  'CICS System ID',
  'Bytes',
  'Kilobytes',
  'Megabytes',
  'Number of regions',
  'Number of transactions',
  'transactions',
  'rate',
  'AIDs queued in the TOR',
  'Number of Links Defined',
  'Number of Links in Use',
  'Percent of Links in Use',
  'Number of Primary Links Defined',
  'Number of Primary Links in Use',
  'Percent of Primary Links in Use',
  'Number of Secondary Links Defined',
  'Number of Secondary Links in Use',
  'Percent of Secondary Links in Use',
  'Rate of Link Allocates',
  'Count of Link Allocates from Originating Region',
  'Percent of Link Allocates from Originating Region',
  'Percent of CPU utilization',
  'Page-ins per second',
  'I/Os per second',
  'CYYMMDDHHMMSSMMM',
  'bytes',
  'Rate per Second',
  'Percent used',
  'Waits per second',
  'Percentage of threads that are active',
  'Percent of HSSP private buffers in use',
  'Percentage',
  'Percent of Samples in which the region is occupied',
  'Contentions per second',
  'Percent of RLEs in use',
  'Percent found in pool',
  'Enqueues per second',
  'Dequeues per second',
  'Queues per second',
  'Input Messages per second',
  'Input messages per second',
  'Percent of Pool in use',
  '"K"',
  '"G"',
  '".1 %"',
  '".1 MB"',
  '".01"',
  '".01 MB/Sec"',
  '".001 %"',
  '".1 GB"',
] as const;
