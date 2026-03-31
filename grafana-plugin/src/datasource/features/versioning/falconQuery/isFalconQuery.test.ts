import { isFalconQueryOfAnyVersion } from './isFalconQuery';
import { falconQueryMocks } from './mocks';

describe(isFalconQueryOfAnyVersion.name, () => {
  falconQueryMocks.forEach((queryMocks) => {
    test('should confirm when given valid Falcon query of any version', () => {
      expect(isFalconQueryOfAnyVersion(queryMocks.metrics)).toEqual(true);
      expect(isFalconQueryOfAnyVersion(queryMocks.situations)).toEqual(true);
    });
  });

  test('should deny when given some object that is not Falcon query', () => {
    const someObj = { datasourceId: 'bla', refId: 'A' };
    expect(isFalconQueryOfAnyVersion(someObj)).toEqual(false);
  });
});
