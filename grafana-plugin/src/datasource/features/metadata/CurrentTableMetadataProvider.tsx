import { TableMetadata } from 'public-domain';
import React, { createContext, ReactNode, useContext } from 'react';

const CurrentTableMetadataContext = createContext<TableMetadata | null>(null);

export function CurrentTableMetadataProvider({
  tableMetadata,
  children,
}: {
  tableMetadata: TableMetadata | null;
  children: ReactNode;
}) {
  return <CurrentTableMetadataContext.Provider value={tableMetadata}>{children}</CurrentTableMetadataContext.Provider>;
}

// I don't want components to crash just because there is no metadata
// selected yet. Let component explicitly handle this case.
export function useCurrentTableMetadata(): TableMetadata | null {
  return useContext(CurrentTableMetadataContext);
}
