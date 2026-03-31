import {
  type AffinityId,
  type AffinityEntity,
  ITM_FRAMEWORK_AFFINITY_ENTITY,
  ITM_FRAMEWORK_AFFINITY_ID,
} from './AffinityEntity';
import { TableMetadata } from './TableMetadata';

export type ApplicationMetadata = {
  id: AffinityId;
  affinityEntity: AffinityEntity;
  productCode: string;
  applicationCode: string;
  applicationName: string;
  tables: ApplicationTableMetadata[];
};

export type ApplicationTableMetadata = Pick<TableMetadata, 'id' | 'name' | 'version' | 'sampleType' | 'isMultiRow'> & {
  restriction?: 'unknown' | 'restricted';
};

// For situations -----------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

/** Framework application tables that are allowed to be used in situation definition formulas. For more - see {@link ITM_FRAMEWORK_APPLICATION_FOR_SITUATIONS} */
export const ITM_FRAMEWORK_APPLICATION_TABLES_FOR_SITUATIONS = [
  {
    id: 'KRAAUDIT',
    name: 'ITM Audit',
    version: 0,
    sampleType: 'pure',
    isMultiRow: true,
  },
  {
    id: 'KRAHIST',
    name: 'ITM Historical Collection',
    version: 0,
    sampleType: 'deltaor',
    isMultiRow: true,
  },
  {
    id: 'LOCALTIME',
    name: 'Local Time',
    version: 0,
    sampleType: 'deltaor',
    isMultiRow: false,
  },
  {
    id: 'KRAMESG',
    name: 'Universal Messages',
    version: 0,
    sampleType: 'pure',
    isMultiRow: true,
  },
  {
    id: 'UTCTIME',
    name: 'Universal Time',
    version: 0,
    sampleType: 'deltaor',
    isMultiRow: false,
  },
] satisfies ApplicationTableMetadata[];

/**
 * `ITM Framework` a.k.a. `All Managed Systems` a.k.a. `O4SRV` a.k.a. affinity ID `&IBM.STATIC000`
 * is special ITM framework "application".
 *
 * It's the only application that has:
 * - (as of 2025-05 in ITM API) correlated situations (those that have keyword "*HSITNAME" in formula)
 * - framework situations (like "Weekday")
 *
 * Specific tables from this application are allowed in situation definition formulas.
 * But we should NOT allow users request metrics from this application.
 *
 * ITM API:
 * - /applications endpoint response does NOT contain this application
 * - /tables endpoint provides tables from this application
 */
export const ITM_FRAMEWORK_APPLICATION_FOR_SITUATIONS = {
  id: ITM_FRAMEWORK_AFFINITY_ID as AffinityId,
  affinityEntity: ITM_FRAMEWORK_AFFINITY_ENTITY,
  applicationCode: ITM_FRAMEWORK_AFFINITY_ENTITY.productCode,
  applicationName: ITM_FRAMEWORK_AFFINITY_ENTITY.displayText,
  productCode: ITM_FRAMEWORK_AFFINITY_ENTITY.productCode,
  tables: ITM_FRAMEWORK_APPLICATION_TABLES_FOR_SITUATIONS,
} satisfies ApplicationMetadata;
