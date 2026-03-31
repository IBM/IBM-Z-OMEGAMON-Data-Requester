import { formatNumber } from './formatNumber';
import { getNumberTestCaseSummary } from './getNumberTestCaseSummary';
import { numberColumnMds, numberCasesAsNumbersAndAsStrings, brokenNumberCasesAsStrings } from './mocks';

describe(formatNumber.name, () => {
  numberColumnMds.forEach((columnMd) => {
    numberCasesAsNumbersAndAsStrings.forEach((val) => {
      const testCaseSummary = getNumberTestCaseSummary(val, columnMd);
      test(testCaseSummary, () => {
        expect(formatNumber(val, columnMd)).toMatchSnapshot();
      });
    });

    brokenNumberCasesAsStrings.forEach((val) => {
      test(`throws error when value "${val}" cannot be converted to number`, () => {
        expect(() => {
          formatNumber(val, columnMd);
        }).toThrow();
      });
    });
  });
});
