import { ColumnMetadata } from 'public-domain';

export const stringColumnValues = [
  'RSD1',
  'VTAM:RSD2',
  'IB1D:RSD4:DB2',
  'ITE2OI0',
  'TSO',
  'DD66C840FFEF8E74',
  '!IB1D CANCEL THREAD (000010)',
];

export const stringColumnMetadata = {
  attributeName: 'Cancel_Command',
  defaultSortDirection: 'A',
  description: 'The command string needed to cancel a thread.',
  extensions: {
    DVERSION: '4',
    NULL: 'N',
    PARM: "H'14',H'00',H'0080',C'C31 ',F'1128'",
    SHARE: 'Y',
    STRUCT: 'ALL_THREADS',
  },
  id: 'KILLTHREAD',
  maxLength: 80,
  name: 'Cancel\nCommand',
  odpName: '',
  sortType: 'lexical',
  type: 'string',
  version: 0,
  atomize: false,
} satisfies ColumnMetadata;
