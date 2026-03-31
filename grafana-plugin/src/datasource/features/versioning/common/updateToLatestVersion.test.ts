import { ApplicationMetadata, ColumnMetadataMap, TableMetadata } from 'public-domain';

import { MetadataLoader } from 'datasource/features/metadata';

import { VersionUpdaters, updateToLatestVersionSync } from './updateToLatestVersion';
import { WithOptionalVersion, WithVersion } from './WithVersion';

type PreviousVersionObject = WithOptionalVersion & {
  [key: string]: unknown;
};

type UpdatedVersionObject = WithVersion & {
  [key: string]: unknown;
};

const fakeMetadataLoader = {
  getApplicationMetadatas: async () => [{ applicationCode: 'APP' } as ApplicationMetadata],
  getTableMetadata: async () =>
    ({
      applicationCode: 'APP',
      id: 'TABLE',
      columns: {
        COL1: { id: 'COL1', type: 'number' },
        COL2: { id: 'COL2', type: 'number' },
        COL3: { id: 'COL3', type: 'number' },
        COL4: { id: 'COL4', type: 'number' },
        COL5: { id: 'COL5', type: 'number' },
        COL6: { id: 'COL6', type: 'number' },
        COL7: { id: 'COL7', type: 'number' },
      } as unknown as ColumnMetadataMap,
    }) as unknown as TableMetadata,
} as unknown as MetadataLoader;

describe(updateToLatestVersionSync.name, () => {
  test('updates to latest version given initial object that has falconVersion: 0', () => {
    const updaters: VersionUpdaters<MetadataLoader> = [
      (structure: object) => ({ ...structure, falconVersion: 1, b: 1 }),
    ];

    const initial: PreviousVersionObject = { falconVersion: 0, a: 0 };
    const latest: UpdatedVersionObject = {
      falconVersion: 1,
      a: 0,
      b: 1,
    };

    expect(updateToLatestVersionSync(initial, updaters, fakeMetadataLoader)).toEqual(latest);
  });

  test('updates to latest version given initial object that does not have falconVersion property', () => {
    const updaters: VersionUpdaters<MetadataLoader> = [
      (structure: object) => ({ ...structure, falconVersion: 1, b: 1 }),
    ];

    const initial: PreviousVersionObject = { a: 0 };
    const latest: UpdatedVersionObject = {
      falconVersion: 1,
      a: 0,
      b: 1,
    };

    expect(updateToLatestVersionSync(initial, updaters, fakeMetadataLoader)).toEqual(latest);
  });

  test('updates to latest version given simple updaters array, that only adds new properties', () => {
    const updaters: VersionUpdaters<MetadataLoader> = [
      (structure: object) => ({ ...structure, falconVersion: 1 }),
      (structure: object) => ({ ...structure, falconVersion: 2, b: 1 }),
      (structure: object) => ({ ...structure, falconVersion: 3, c: 2 }),
    ];

    const initial: PreviousVersionObject = { a: 0 };
    const latest: UpdatedVersionObject = {
      falconVersion: 3,
      a: 0,
      b: 1,
      c: 2,
    };

    expect(updateToLatestVersionSync(initial, updaters, fakeMetadataLoader)).toEqual(latest);
  });

  const secondUpdater = (structure: WithVersion & { a: number }) => ({ falconVersion: 2, b: structure.a });
  const thirdUpdater = (structure: WithVersion & { b: number }) => ({ falconVersion: 3, c: structure.b });

  test('updates to latest version given updaters array, that remaps properties', () => {
    const updaters: VersionUpdaters<MetadataLoader> = [
      (structure: object) => ({ ...structure, falconVersion: 1 }),
      secondUpdater,
      thirdUpdater,
    ];

    const initial: PreviousVersionObject = { a: 123 };
    const expectedLatestVersionStructure: UpdatedVersionObject = {
      falconVersion: 3,
      c: 123,
    };

    expect(updateToLatestVersionSync(initial, updaters, fakeMetadataLoader)).toEqual(expectedLatestVersionStructure);
  });

  test('fails to update to latest version given incorrectly ordered updaters array, that remaps properties', () => {
    const updaters: VersionUpdaters<MetadataLoader> = [
      (structure: object) => ({ ...structure, falconVersion: 1 }),
      thirdUpdater,
      secondUpdater,
    ];

    const initial: PreviousVersionObject = { a: 123 };
    const expectedLatestVersionStructure: UpdatedVersionObject = {
      falconVersion: 3,
      c: 123,
    };

    expect(updateToLatestVersionSync(initial, updaters, fakeMetadataLoader)).not.toEqual(
      expectedLatestVersionStructure
    );
  });
});
