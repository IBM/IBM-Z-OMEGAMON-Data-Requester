import { monacoTypes } from '@grafana/ui';
import { TableMetadata, FilteredTableMetadata, ApplicationMetadata, ApplicationTableMetadata } from 'public-domain';

import { detectApplicationAndTable } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery';
import { KNOWN_CMS_SQL_KEYWORDS } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';
import { MetadataLoader } from 'datasource/features/metadata';

const getColumnSuggestions = (
  tableMetadata: TableMetadata,
  monaco: typeof monacoTypes,
  range: monacoTypes.Range
): monacoTypes.languages.CompletionList => {
  const suggestions = Object.values(tableMetadata.columns).map((column) => ({
    label: column.id === column.name ? column.id : `${column.id} ${column.name.replace(/\n/g, ' ')}`,
    kind: monaco.languages.CompletionItemKind.Field,
    detail: column.description,
    range: range,
    insertText: KNOWN_CMS_SQL_KEYWORDS.includes(column.id.toLocaleLowerCase())
      ? `${tableMetadata.id}.${column.id}`
      : column.id,
  }));
  return { suggestions };
};

const getTableSuggestions = (
  tableMetadatas: Array<FilteredTableMetadata<'id' | 'name' | 'description'>>,
  monaco: typeof monacoTypes,
  range: monacoTypes.Range
): monacoTypes.languages.CompletionList => {
  const suggestions = tableMetadatas.map((tableMetadata) => ({
    label: tableMetadata.id === tableMetadata.name ? tableMetadata.id : `${tableMetadata.id} ${tableMetadata.name}`,
    kind: monaco.languages.CompletionItemKind.Reference,
    detail: tableMetadata.description,
    range: range,
    insertText: tableMetadata.id,
  }));
  return { suggestions };
};

const getApplicationSuggestions = (
  applicationMetadatas: ApplicationMetadata[],
  monaco: typeof monacoTypes,
  range: monacoTypes.Range
): monacoTypes.languages.CompletionList => {
  const suggestions = applicationMetadatas.map((applicationMetadata) => ({
    label: `${applicationMetadata.applicationCode}:${applicationMetadata.applicationName}`,
    kind: monaco.languages.CompletionItemKind.Reference,
    insertText: applicationMetadata.applicationCode,
    range: range,
  }));
  return { suggestions };
};

const getSuggestions = async (
  monaco: typeof monacoTypes,
  metadataLoader: MetadataLoader,
  model: monacoTypes.editor.ITextModel,
  position: monacoTypes.Position
): Promise<monacoTypes.languages.CompletionList> => {
  const sqlText = model.getValue();
  const { applicationCode, tableId } = detectApplicationAndTable(sqlText) || {};
  const currentWord = model.getWordUntilPosition(position);
  const range = new monaco.Range(
    position.lineNumber,
    currentWord.startColumn,
    position.lineNumber,
    currentWord.endColumn
  );
  if (applicationCode && tableId) {
    try {
      const tableMetadata = await metadataLoader.getTableMetadata(tableId);
      return getColumnSuggestions(tableMetadata, monaco, range);
    } catch (_) {
      //fall throught
    }
  }

  try {
    const applicationMetadatas = await metadataLoader.getApplicationMetadatas();
    if (applicationCode) {
      const tablesSet = applicationMetadatas.reduce((acc, application) => {
        if (application.applicationCode === applicationCode) {
          application.tables.forEach((el) => acc.add(el));
        }
        return acc;
      }, new Set<ApplicationTableMetadata>());
      const partialTableMetadatas = [...tablesSet].map((el) => ({
        id: el.id,
        name: el.name,
        desc: '',
      }));

      return getTableSuggestions(partialTableMetadatas, monaco, range);
    }
    return getApplicationSuggestions(applicationMetadatas, monaco, range);
  } catch (_) {
    //fall throught
  }
  return { suggestions: [] };
};

export function getCmsSqlCompletionProvider(
  monaco: typeof monacoTypes,
  metadataLoader: MetadataLoader
): monacoTypes.languages.CompletionItemProvider {
  return {
    provideCompletionItems: async (
      model: monacoTypes.editor.ITextModel,
      position: monacoTypes.Position,
      context: monacoTypes.languages.CompletionContext,
      token: monacoTypes.CancellationToken
    ): Promise<monacoTypes.languages.CompletionList> => await getSuggestions(monaco, metadataLoader, model, position),
    triggerCharacters: ['.', ' '],
  };
}
