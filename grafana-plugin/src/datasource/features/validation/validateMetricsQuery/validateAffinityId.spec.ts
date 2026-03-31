import { ApplicationMetadata } from 'public-domain';

import { MetricsQueryParams } from 'datasource/domain';
import { MetadataLoader } from 'datasource/features/metadata';
import { mockedMetadataLoader } from 'datasource/features/metadata/mocks';

import { validateAffinityId } from './validateAffinityId';
import { ValidationProblem } from './validatorCommon';

describe('Validate affinityId in MetricsQueryParams', () => {
  test('Valid affinityId', async () => {
    expect(
      await validateAffinityId({ affinityId: '%IBM.STATIC017' } as MetricsQueryParams, mockedMetadataLoader)
    ).toBeNull();
  });

  test('User is not authorized to see this application, or application is not installed', async () => {
    expect(
      await validateAffinityId({ affinityId: '%IBM.STATIC149' } as MetricsQueryParams, mockedMetadataLoader)
    ).toBeNull();
  });

  test('Invalid affinityId', async () => {
    expect(await validateAffinityId({ affinityId: 'INCORRECT' } as MetricsQueryParams, mockedMetadataLoader)).toEqual({
      severity: 'error',
      message: `Application with affinityId "INCORRECT" is unknown`,
      affectedTokens: undefined,
    } as ValidationProblem);
  });

  test('affinityId is not provided', async () => {
    expect(await validateAffinityId({} as MetricsQueryParams, mockedMetadataLoader)).toEqual({
      severity: 'error',
      message: `Application is not selected`,
      affectedTokens: undefined,
    } as ValidationProblem);
  });

  test('Error handling during application metadata request', async () => {
    const mockedGetApplicationMetadatas = async (): Promise<ApplicationMetadata[]> => {
      throw new Error('Could not talk to TEMS');
    };

    expect(
      await validateAffinityId(
        { affinityId: '%IBM.STATIC017' } as MetricsQueryParams,
        { getApplicationMetadatas: mockedGetApplicationMetadatas } as MetadataLoader
      )
    ).toEqual({
      severity: 'error',
      message: `Error occurred while getting available application list: Could not talk to TEMS`,
      affectedTokens: undefined,
    } as ValidationProblem);
  });
});
