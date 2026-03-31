import { ColumnMetadata, EnumMap } from 'public-domain';

import { simpleAndHexNumbers } from './mocks';
import { reverseFormatAndApplyEnums } from './reverseFormat';
import { reverseFormatEnum } from './reverseFormatEnum';
import { reverseFormatNumber } from './reverseFormatNumber';
import { reverseFormatTimestamp } from './reverseFormatTimestamp';

describe(reverseFormatAndApplyEnums.name, () => {
  describe(`if given date, returns same result as ${reverseFormatTimestamp.name}`, () => {
    const timestampColumnMd = { type: 'itmTimestamp' } as ColumnMetadata;
    const dates = [
      new Date('1995-12-17T03:24:00'),
      new Date('2005-04-11T01:56:01'),
      new Date('2020-11-23T11:22:33'),
      new Date(),
    ];
    dates.forEach((date) => {
      it(`date ${date}`, () => {
        expect(reverseFormatAndApplyEnums(date, timestampColumnMd)).toEqual(reverseFormatTimestamp(date));
      });
    });
  });

  describe(`if given enum map and value match found, returns same result as ${reverseFormatEnum.name}`, () => {
    const enumsNumerical: EnumMap = {
      '-123': 'val1',
      '0': 'val2',
      '00234': 'val3',
      '0X0000': 'val4',
      '0X0A': 'val5',
      '0xFFFF': 'val6',
    };
    const columnMdWithNumericalEnums = { type: 'number', enums: enumsNumerical } as ColumnMetadata;
    Object.entries(columnMdWithNumericalEnums.enums as EnumMap).forEach(([key, val]) => {
      it(`enum key = "${key}"`, () => {
        expect(reverseFormatAndApplyEnums(val, columnMdWithNumericalEnums)).toEqual(
          reverseFormatEnum(val, columnMdWithNumericalEnums)
        );
      });
    });

    const enumsAlphabetical: EnumMap = {
      bla1: 'val1',
      bla2: 'val2',
    };
    const columnMdWithAlphabeticalEnums = { type: 'string', enums: enumsAlphabetical } as ColumnMetadata;
    Object.entries(columnMdWithAlphabeticalEnums.enums as EnumMap).forEach(([key, val]) => {
      it(`enum key = "${key}"`, () => {
        expect(reverseFormatAndApplyEnums(val, columnMdWithAlphabeticalEnums)).toEqual(
          reverseFormatEnum(val, columnMdWithAlphabeticalEnums)
        );
      });
    });
  });

  describe(`if given enum map and column has scaleFactor and value match found, returns reverse-scaled enum key`, () => {
    const enumsNumerical: EnumMap = {
      '0.001': 'val1',
      '0.014': 'val2',
      '-17.99': 'val3',
      '1.001': 'val4',
      '1.003': 'val5',
      '1.005': 'val6',
    };
    const enumValues: string[] = ['val1', 'val2', 'val3'];
    const enumValuesExpected: number[] = [1, 14, -17990];

    const simpleValues: number[] = [5.001, -100, 0.111];
    const simpleValuesExpected: number[] = [5001, -100000, 111];

    const columnMdWithNumericalEnums = { type: 'number', enums: enumsNumerical, scaleFactor: 3 } as ColumnMetadata;

    enumValues.forEach((value, index) => {
      it(`value with match in enum = "${value}"`, () => {
        expect(reverseFormatAndApplyEnums(value, columnMdWithNumericalEnums)).toEqual(enumValuesExpected[index]);
      });
    });

    simpleValues.forEach((value, index) => {
      it(`value with no match in enum = "${value}"`, () => {
        expect(reverseFormatAndApplyEnums(value, columnMdWithNumericalEnums)).toEqual(simpleValuesExpected[index]);
      });
    });
  });

  describe('if column type is string and given string value, and no enum match found, then returns same string value', () => {
    it('no enums map supplied', () => {
      const columnMd = { type: 'string', enums: undefined } as ColumnMetadata;
      const val = 'bla';
      expect(reverseFormatAndApplyEnums(val, columnMd)).toEqual(val);
    });
    it('if enums supplied, but no match found', () => {
      const enums: EnumMap = {
        someKey: 'someVal',
      };
      const someOtherVal = 'someOtherVal';
      const columnMd = { type: 'string', enums } as ColumnMetadata;
      expect(reverseFormatAndApplyEnums(someOtherVal, columnMd)).toEqual(someOtherVal);
    });
  });

  describe(`number reverse formatting is handled by ${reverseFormatNumber.name}`, () => {
    const columnMd = { type: 'number', enums: undefined } as ColumnMetadata;
    simpleAndHexNumbers.forEach((valueAsNumber) => {
      it(`${valueAsNumber}`, () => {
        expect(reverseFormatAndApplyEnums(valueAsNumber, columnMd)).toEqual(
          reverseFormatNumber(valueAsNumber, undefined)
        );
      });
    });
  });

  describe('throws error in case of mismatch between supplied value and column metadata', () => {
    it('e.g. itmTimestamp column type and number value', () => {
      const timestampColumnMd = { type: 'itmTimestamp' } as ColumnMetadata;
      const valueAsNotDate = 420;
      expect(() => reverseFormatAndApplyEnums(valueAsNotDate, timestampColumnMd)).toThrowErrorMatchingInlineSnapshot(
        `"Unexpected data type, value: 420 (type: number), column type: itmTimestamp"`
      );
    });

    it('e.g. string column type and Date object value', () => {
      const stringColumnMd = { type: 'string' } as ColumnMetadata;
      const valueAsDate = new Date();
      expect(() => reverseFormatAndApplyEnums(valueAsDate, stringColumnMd)).toThrowErrorMatchingInlineSnapshot(
        `"Value should be Date only when it is itmTimestamp type"`
      );
    });
  });
});
