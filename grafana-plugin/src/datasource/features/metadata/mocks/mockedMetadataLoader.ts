import { MetadataLoader } from 'datasource/features/metadata';

import { mockedApplicationMetadatas } from './mockedApplicationMetadatas';
import { mockedTableMetadatas, mockedTablesResponse } from './mockedTableMetadatas';

export const mockedMetadataLoader = {
  getApplicationMetadatas: async () => mockedApplicationMetadatas,
  getTableMetadatas: async (tabledIds) => mockedTableMetadatas.filter(({ id }) => tabledIds.includes(id)),
  getTableMetadata: async (tableId) => mockedTablesResponse(tableId),
} as MetadataLoader;
