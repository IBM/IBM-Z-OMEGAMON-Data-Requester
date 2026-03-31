import { ColumnMetadata } from 'public-domain';

import { shouldFormatNumberAsHex } from './shouldFormatNumberAsHex';

describe(shouldFormatNumberAsHex.name, () => {
  test('should return true', () => {
    expect(shouldFormatNumberAsHex({ printf: '%04X' } as ColumnMetadata)).toEqual(true);
  });
  test('should return false', () => {
    expect(shouldFormatNumberAsHex({ printf: '%5.1f' } as ColumnMetadata)).toEqual(false);
  });
  test('no printF, should return false', () => {
    expect(shouldFormatNumberAsHex({} as ColumnMetadata)).toEqual(false);
  });
});
