export const negativeNumbersAsHex2sComplements = [
  '0xFFFFFFFF',
  '0xFFFFBA98',
  '0xA1234567',
  '0x80000000',
  '0x8A3A1234',
  '0X000ffffffff', // X uppercase & prepended with 0s & lowercase hex digit letters
];

export const nonNegativeNumbersAsHex = [
  '0x0',
  '0x1',
  '0xA',
  '0x000C', // prepended with 0s
  '0xABCDEF',
  '0x1234567',
  '0X0', // X uppercase
  '0X0A', // X uppercase & prepended with 0s
  '0X00abc', // X uppercase & prepended with 0s & lowercase hex digit letters
];

export const hexNumbers = [...negativeNumbersAsHex2sComplements, ...nonNegativeNumbersAsHex];

export const stringifiedDecimalNumbers = [
  '-123',
  '-1',
  '0',
  '1',
  '10',
  '123',
  '14834921',
  '0.1',
  '0.00234',
  '-0.723',
  '000123', // prepended with 0s
  '  123  ', // untrimmed
  '  -0.123  ', // untrimmed
];

export const simpleNumbers = [-123, -1, 0, 1, 10, 123, 14834921, 0.1, 0.00234, -0.723];

export const simpleAndHexNumbers = [...simpleNumbers, ...hexNumbers, ...stringifiedDecimalNumbers];
