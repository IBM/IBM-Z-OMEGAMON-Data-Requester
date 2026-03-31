import { ColumnMetadata, EnumMap } from 'public-domain';

import { reverseFormatEnum } from './reverseFormatEnum';

describe(reverseFormatEnum.name, () => {
  it('returns undefined, if no enum map', () => {
    expect(reverseFormatEnum('bla', { type: 'number', enums: undefined } as ColumnMetadata)).toEqual(undefined);
  });

  it('returns undefined, if value does not match any value in enum map', () => {
    const enums: EnumMap = {
      bla: 'val1',
      bla2: 'val2',
    };
    expect(reverseFormatEnum('someOtherValue', { enums, type: 'string' } as ColumnMetadata)).toEqual(undefined);
  });

  it('returns matched key as string, if column type is string', () => {
    const key = 'blaKey';
    const enums = { [key]: 'blaVal' } as EnumMap;
    expect(reverseFormatEnum('blaVal', { type: 'string', enums } as ColumnMetadata)).toEqual(expect.any(String));
    expect(reverseFormatEnum('blaVal', { type: 'string', enums } as ColumnMetadata)).toEqual(key);
  });

  it('throws error, if column type is number, but matched key cannot be converted to number', () => {
    const val = 'val';
    const enums = { someKeyThatCantBeConvertedToNumber: val } as EnumMap;
    expect(() => reverseFormatEnum(val, { type: 'number', enums } as ColumnMetadata)).toThrowError();
  });

  it('can match value of type string that hold number to a value as simple number in enum map', () => {
    const valueAsNumber = 42;
    const valueAsString = '42';
    const keyAsNumber = 69;
    const enums = { [keyAsNumber]: valueAsNumber } as EnumMap;
    expect(reverseFormatEnum(valueAsString, { type: 'number', enums } as ColumnMetadata)).toEqual(keyAsNumber);
  });

  const enums: EnumMap = {
    '-123': 'val1',
    '0': 'val2',
    '00234': 'val3',
    '0X0000': 'val4',
    '0X0A': 'val5',
    '0xFFFF': 'val6',
  };
  const columnMd = { type: 'number', enums } as ColumnMetadata;

  Object.entries(enums).forEach(([key, val]) => {
    it('returns number, if column type is number and matched key is decimal or hex number', () => {
      expect(reverseFormatEnum(val, columnMd)).toEqual(expect.any(Number));
      expect(reverseFormatEnum(val, columnMd)).toEqual(Number(key));
    });

    it(`raw key = "${key}"`, () => {
      expect(reverseFormatEnum(val, columnMd)).toMatchSnapshot();
    });
  });
});
