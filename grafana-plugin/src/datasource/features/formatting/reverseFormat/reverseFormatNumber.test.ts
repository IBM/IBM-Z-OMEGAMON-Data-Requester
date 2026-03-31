import {
  negativeNumbersAsHex2sComplements,
  nonNegativeNumbersAsHex,
  simpleNumbers,
  hexNumbers,
  stringifiedDecimalNumbers,
} from './mocks';
import { reverseFormatNumber } from './reverseFormatNumber';

describe(reverseFormatNumber.name, () => {
  describe('if hex number is 4 byte length (0xHHHHHHHH) with left-most bit as `1`, then this hex is converted into negative decimal', () => {
    negativeNumbersAsHex2sComplements.forEach((val) => {
      it(val, () => {
        const decimalNumber = reverseFormatNumber(val, undefined);
        expect(decimalNumber).toBeLessThan(0);
      });
    });
  });

  describe('other hex numbers are converted to non-negative decimal', () => {
    nonNegativeNumbersAsHex.forEach((val) => {
      it(val, () => {
        const decimalNumber = reverseFormatNumber(val, undefined);
        expect(decimalNumber).toBeGreaterThanOrEqual(0);
        expect(decimalNumber).toEqual(parseInt(val, 16));
      });
    });
  });

  describe('returns same number, when passed simple JavaScript number without scaleFactor', () => {
    simpleNumbers.forEach((val) => {
      it(`${val}`, () => {
        expect(reverseFormatNumber(val, undefined)).toEqual(val);
      });
    });
  });

  describe('correctly handles scaleFactor', () => {
    simpleNumbers.forEach((val) => {
      it(`${val}`, () => {
        expect(reverseFormatNumber(val, 3)).toEqual(val * 1000);
      });
    });
  });

  describe('throws error, if supplied with string that does not hold valid number', () => {
    const unconvertableStrings = ['', '   ', 'iCannotBeConvertedToNumber', '420bla', 'bla420', '0xABCDEFG', '0XNN'];
    unconvertableStrings.forEach((val) => {
      it(`"${val}"`, () => {
        expect(() => reverseFormatNumber(val, undefined)).toThrowError();
      });
    });
  });

  describe('hex', () => {
    hexNumbers.forEach((val) => {
      it(`"${val}"`, () => {
        const decimalNumber = reverseFormatNumber(val, undefined);
        expect(decimalNumber).toMatchSnapshot();
      });
    });
  });

  describe('dec', () => {
    stringifiedDecimalNumbers.forEach((val) => {
      it(`"${val}"`, () => {
        const decimalNumber = reverseFormatNumber(val, undefined);
        expect(decimalNumber).toMatchSnapshot();
      });
    });
  });
});
