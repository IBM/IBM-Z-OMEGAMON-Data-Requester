import { type DeepPropNames, type DeepPick } from 'public-common';

import { type AffinityEntity } from './AffinityEntity';
import { type ColumnMetadata } from './ColumnMetadata';

export interface TableMetadata {
  productCode: string;
  applicationCode: string;
  applicationName: string; // to be added in future

  id: string; // tableIdentifier
  name: string; //longTableLabel
  description?: string; //tableDescription
  columns: ColumnMetadataMap;
  affinityEntity: AffinityEntity;

  sampleType: SampleType;
  isMultiRow: boolean;

  /**
   * Min version of agent/application that supports table, i.e. version in which table was introduced
   */
  versionOfIntroduction: number;
  /**
   * Min version of agent/application that supports table with all it's columns, i.e. version in which table was last updated
   */
  versionOfLastUpdate: number;

  // Dont ever use this, ITM randomly increments or doesnt increment when adding columns.
  // version: number;
}

/** `ATR2_st_unknown` means that sample type is unrecognized */
export type SampleType = 'pure' | 'delta' | 'polled' | 'deltaor' | 'ATR2_st_unknown';

export interface ColumnMetadataMap {
  //columnIdentifier
  [columnId: string]: ColumnMetadata;
}

export type AvailableTableMetadataPropertyArray = ReadonlyArray<DeepPropNames<TableMetadata>>;

export function validateTableMetadataFieldList<TPropertyArray extends AvailableTableMetadataPropertyArray>(
  arr: TPropertyArray
): TPropertyArray {
  return arr;
}

export type FilteredTableMetadata<PROPS extends DeepPropNames<TableMetadata>> = DeepPick<TableMetadata, PROPS>;
