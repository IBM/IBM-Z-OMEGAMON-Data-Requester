import { convertToNumber } from './convertToNumber';
import { brokenNumberCasesAsStrings } from './mocks';

describe(convertToNumber.name, () => {
  test('returns same value, if it is number', () => {
    const someNumber = 420;
    expect(convertToNumber(someNumber)).toEqual(someNumber);
  });
  test('converts hex string to number', () => {
    expect(convertToNumber('0xA')).toEqual(10);
    expect(convertToNumber('0XA')).toEqual(10);
  });
  test('converts non-hex string to number', () => {
    expect(convertToNumber('123')).toEqual(123);
    expect(convertToNumber('0')).toEqual(0);
    expect(convertToNumber('-420')).toEqual(-420);
  });

  brokenNumberCasesAsStrings.forEach((val) => {
    test(`throws error when value "${val}" cannot be converted to number`, () => {
      expect(() => {
        convertToNumber(val);
      }).toThrow();
    });
  });
});
