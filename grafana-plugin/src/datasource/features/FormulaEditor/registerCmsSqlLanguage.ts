import { monacoTypes } from '@grafana/ui';

import { MetadataLoader } from 'datasource/features/metadata';

import { CmsSqlTokenProvider } from './CmsSqlTokenProvider';
import { getCmsSqlCompletionProvider } from './getCmsSqlCompletionProvider';

let registered = false;

export function registerCmsSqlLanguage(monaco: typeof monacoTypes, metadataLoader: MetadataLoader): void {
  if (registered) {
    return;
  }
  registered = true;
  monaco.languages.register({
    id: 'cms-sql',
  });
  monaco.languages.setTokensProvider('cms-sql', new CmsSqlTokenProvider());
  monaco.languages.registerCompletionItemProvider('cms-sql', getCmsSqlCompletionProvider(monaco, metadataLoader));
}
