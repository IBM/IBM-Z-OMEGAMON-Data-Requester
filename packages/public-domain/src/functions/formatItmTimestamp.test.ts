import { formatItmTimestamp } from './formatItmTimestamp';
import { validItmTimestamps, invalidItmTimestamps } from './mocks';

describe(formatItmTimestamp.name, () => {
  validItmTimestamps.forEach((itmTimestamp) => {
    test(`"${itmTimestamp}"`, () => {
      expect(formatItmTimestamp(itmTimestamp)).toMatchSnapshot();
    });
  });
  describe('invalid ITM timestamps', () => {
    invalidItmTimestamps.forEach((invalidItmTimestamp) => {
      test(invalidItmTimestamp, () => {
        const invalidDate = formatItmTimestamp(invalidItmTimestamp);
        expect(invalidDate.toString()).toEqual('Invalid Date');
      });
    });
  });
});
