import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools as TanStackQueryDevtools } from '@tanstack/react-query-devtools';
import React, { ReactNode, createContext, useContext } from 'react';

import { MetadataLoader } from './MetadataLoader';

const MetadataLoaderContext = createContext<MetadataLoader | undefined>(undefined);

export function MetadataLoaderProvider({
  metadataLoader,
  children,
}: {
  metadataLoader: MetadataLoader;
  children: ReactNode;
}) {
  return (
    <MetadataLoaderContext.Provider value={metadataLoader}>
      <TanStackQueryClientProvider client={metadataLoader.metadataTanStackQueryClient}>
        {children}
        {/* By default, React Query Devtools are only included in bundles when process.env.NODE_ENV === 'development' */}
        <TanStackQueryDevtools
          initialIsOpen={false}
          position="bottom-right"
          closeButtonProps={{
            style: {
              left: 'auto',
              right: '0',
            },
          }}
        />
      </TanStackQueryClientProvider>
    </MetadataLoaderContext.Provider>
  );
}

type MetadataTanStackQueries = MetadataLoader['metadataTanStackQueries'];

export function useMetadataLoader(): MetadataLoader {
  const metadataLoader = useContext(MetadataLoaderContext);
  if (metadataLoader == null) {
    throw new Error('Unable to get metadataLoader from MetadataTanStackQueriesContext');
  }
  return metadataLoader;
}

export function useMetadataTanStackQueries(): MetadataTanStackQueries {
  return useMetadataLoader().metadataTanStackQueries;
}
