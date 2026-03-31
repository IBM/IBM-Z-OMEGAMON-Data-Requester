import { TableMetadata, ColumnMetadata } from 'public-domain';

import { applyBaseFormatting } from './format';

export function formatEnumKeysInTableMd(tableMd: TableMetadata): TableMetadata {
  const columnMdEntries = Object.entries(tableMd.columns);

  const columnMdEntriesWithFormattedEnumKeys = columnMdEntries.map<[string, ColumnMetadata]>(
    ([columndId, columnMd]) => {
      const columnMdWithFormattedEnumKeys = formatEnumKeysInColumnMd(columnMd);
      return [columndId, columnMdWithFormattedEnumKeys];
    }
  );

  const columnMdMapWithFormattedEnumKeys = Object.fromEntries(columnMdEntriesWithFormattedEnumKeys);

  const tableMdWithFormattedEnumKeys: TableMetadata = {
    ...tableMd,
    columns: columnMdMapWithFormattedEnumKeys,
  };

  return tableMdWithFormattedEnumKeys;
}

export function formatEnumKeysInColumnMd(columnMd: ColumnMetadata): ColumnMetadata {
  if (!columnMd.enums) {
    return columnMd;
  }

  if (columnMd.type === 'itmTimestamp') {
    /**
     * See features/format/README.md
     */
    const { enums, ...otherProperties } = columnMd;
    const columnMdWithoutEnums: ColumnMetadata = { ...otherProperties };
    return columnMdWithoutEnums;
  }

  const enumEntries = Object.entries(columnMd.enums);

  type EnumEntry = [string, string | number];

  const enumEntriesWithFormattedKeys = enumEntries
    .map<EnumEntry | null>(([key, val]) => {
      const formattedKey = formatEnumKey(key, columnMd);

      if (formattedKey === null) {
        return null;
      }

      return [`${formattedKey}`, val];
    })
    .filter((entryOrNull): entryOrNull is EnumEntry => entryOrNull != null);

  const enumMapWithFormattedKeys = Object.fromEntries(enumEntriesWithFormattedKeys);

  const columnMdWithFormattedEnumKeys: ColumnMetadata = {
    ...columnMd,
    enums: enumMapWithFormattedKeys,
  };

  return columnMdWithFormattedEnumKeys;
}

function formatEnumKey(key: string, columnMd: ColumnMetadata): string | null {
  try {
    const formattedKey = applyBaseFormatting(key, columnMd);
    return `${formattedKey}`;
  } catch (e) {
    /**
     * Formatting can throw error sometimes
     * e.g. REALSTOR.STORTYPE column has enum with key '001A', which fails to be converted to number.
     */
    return null;
  }
}
