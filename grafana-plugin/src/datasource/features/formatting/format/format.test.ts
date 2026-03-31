import { EnumMap, ColumnMetadata } from 'public-domain';

import { applyAllFormatting, applyBaseFormatting } from './format';
import { formatNumber } from './formatNumber';
import { getNumberTestCaseSummary } from './getNumberTestCaseSummary';
import {
  stringEnumColumnMetadataAndValues,
  stringColumnValues,
  stringColumnMetadata,
  numberColumnMds,
  numberCasesAsNumbersAndAsStrings,
  numberEnumColumnMetadataAndValues,
} from './mocks';

describe(applyAllFormatting.name, () => {
  describe('columnMetadata.enums defined', () => {
    describe('enum match found', () => {
      describe('value is string', () => {
        stringEnumColumnMetadataAndValues.values.forEach((value) => {
          test(`${value}`, () => {
            const { columnMetadata } = stringEnumColumnMetadataAndValues;
            const enums = columnMetadata.enums as EnumMap;
            expect(applyAllFormatting(value, columnMetadata)).toEqual(enums[value]);
          });
        });
      });
      describe('value is number', () => {
        numberEnumColumnMetadataAndValues.values.forEach((value) => {
          test(`${value}`, () => {
            const { columnMetadata } = numberEnumColumnMetadataAndValues;
            const enums = columnMetadata.enums as EnumMap;
            expect(applyAllFormatting(value, columnMetadata)).toEqual(enums[value]);
          });
        });
      });
    });
    describe('enum match NOT found', () => {
      test('value is string', () => {
        const value = 'someValueThatDoesNotMatchAnyKeyInEnumsMap';
        expect(applyAllFormatting(value, stringEnumColumnMetadataAndValues.columnMetadata)).toEqual(value);
      });
      test('value is number', () => {
        const value = 42069;
        expect(applyBaseFormatting(value, numberEnumColumnMetadataAndValues.columnMetadata)).toEqual(value);
        expect(applyAllFormatting(value, numberEnumColumnMetadataAndValues.columnMetadata)).toEqual(`${value}`);
      });
      test('value is number and hex PRINTF defined', () => {
        const columnMd = {
          printf: "'%08X'",
          ...numberEnumColumnMetadataAndValues.columnMetadata,
        } as ColumnMetadata;
        expect(applyAllFormatting(42069, columnMd)).toMatchInlineSnapshot(`"42069"`);
      });
      test('value is number and scaleFactor defined', () => {
        const columnMd = {
          ...numberEnumColumnMetadataAndValues.columnMetadata,
          scaleFactor: 2,
        } as ColumnMetadata;
        expect(applyAllFormatting(42069, columnMd)).toEqual('420.69');
      });
    });
  });

  describe('strings should remain unchanged', () => {
    stringColumnValues.forEach((val) => {
      test(val, () => {
        expect(applyAllFormatting(val, stringColumnMetadata)).toEqual(val);
      });
    });
  });

  describe(`number formatting handled by ${applyBaseFormatting.name}`, () => {
    numberColumnMds.forEach((columnMd) => {
      numberCasesAsNumbersAndAsStrings.forEach((val) => {
        const testCaseSummary = getNumberTestCaseSummary(val, columnMd);
        test(testCaseSummary, () => {
          expect(applyBaseFormatting(val, columnMd as ColumnMetadata)).toEqual(formatNumber(val, columnMd));
        });
      });
    });
  });

  describe(`number formatting handled by ${applyAllFormatting.name}`, () => {
    numberColumnMds.forEach((columnMd) => {
      numberCasesAsNumbersAndAsStrings.forEach((val) => {
        const testCaseSummary = getNumberTestCaseSummary(val, columnMd);
        test(testCaseSummary, () => {
          expect(applyAllFormatting(val, columnMd as ColumnMetadata)).toMatchSnapshot();
        });
      });
    });
  });
});
