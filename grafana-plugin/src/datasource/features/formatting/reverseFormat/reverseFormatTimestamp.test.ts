import { formatItmTimestamp } from 'public-domain';

import { validItmTimestamps } from 'datasource/features/formatting/format/mocks';

import { reverseFormatTimestamp } from './reverseFormatTimestamp';

describe(`${reverseFormatTimestamp.name} should do the opposite of ${formatItmTimestamp.name}`, () => {
  validItmTimestamps.forEach((itmTimestamp) => {
    test(`"${itmTimestamp}"`, () => {
      const date = formatItmTimestamp(itmTimestamp);
      const regeneratedItmTimestamp = reverseFormatTimestamp(date);
      expect(itmTimestamp.trim()).toEqual(regeneratedItmTimestamp);
    });
  });
});
