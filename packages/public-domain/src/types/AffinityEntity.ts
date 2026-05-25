import { type Branded } from 'public-common';

export type AffinityId = Branded<string, 'AffinityId'>;

export type AffinityEntity = {
  id: AffinityId;
  displayText: string;
  productCode: string;
  symbol: string;
};

export const MVS_CICS_AFFINITY_ID = '%IBM.STATIC011';
const JVM_PLEX_AFFINITY_ID = '%IBM.JVM_Plex' as AffinityId;

export type AffinityIdToNameAndGroup = {
  [affinityId: string]: { name: string; defaultAllGroup: string };
};

/**
 * Base affinities supported for metrics, situations and history configs
 * Don't forget to also modify corresponding map in Go: CommonlySupportedAffinities
 */
const COMMONLY_SUPPORTED_AFFINITIES: AffinityIdToNameAndGroup = {
  [MVS_CICS_AFFINITY_ID]: { name: 'MVS CICS', defaultAllGroup: '*MVS_CICS' },
  '%IBM.CICSplex': { name: 'CICSplex', defaultAllGroup: '*IBM_CICSplex' },
  '%IBM.STATIC115': { name: 'CICS Transaction Gateway', defaultAllGroup: '*MVS_CICSTG' },
  '%IBM.STATIC014': { name: 'IMS Subsystems', defaultAllGroup: '*MVS_IMSPLEX' },
  '%IBM.JVM_Monitor': { name: 'JVM Monitor', defaultAllGroup: '*JVM_Monitor' },
  [JVM_PLEX_AFFINITY_ID]: { name: 'JVM Plex', defaultAllGroup: '*JVM_Plex' },
  '%IBM.STATIC022': { name: 'MQ Queue Manager', defaultAllGroup: '*MVS_MQM' },
  '%IBM.STATIC163': { name: 'MQ Queue Sharing Group', defaultAllGroup: '*MQ_QSG' },
  '%IBM.STATIC154': { name: 'Integration Bus Broker Node', defaultAllGroup: '*MQSI_BROKER_V7' },
  '%IBM.STATIC128': { name: 'Integration Bus Agent', defaultAllGroup: '*MQSI_AGENT' },
  '%IBM.STATIC150': { name: 'Mainframe Networks', defaultAllGroup: '*OMEGAMONXE_MAINFRAME_NTWK' },
  '%IBM.STATIC149': { name: 'TCP/IP', defaultAllGroup: '*OMEGAMONXE_MAINFRAME_NTWK_TCP' },
  '%IBM.STATIC148': { name: 'VTAM', defaultAllGroup: '*OMEGAMONXE_MAINFRAME_NTWK_VTAM' },
  '%IBM.STATIC017': { name: 'IBM Z OMEGAMON AI for Db2 v6', defaultAllGroup: '*MVS_DB2' },
  '%IBM.STATIC006': { name: 'zOS SYSPLEX', defaultAllGroup: '*MVS_SYSPLEX' },
  '%IBM.STATIC007': { name: 'zOS SYSTEM', defaultAllGroup: '*MVS_SYSTEM' },
  '%IBM.STATIC139': { name: 'Storage Subsystem', defaultAllGroup: '*OMEGAMONXE_SMS' },
  '%IBM.STATIC101': { name: 'ZVM and Linux', defaultAllGroup: '*OMXE_VM' },
  '%IBM.STATIC002': { name: 'NetView', defaultAllGroup: '*ZNETVIEW' },
};

export const NETWORK_APPLICATION_IDS = ['%IBM.STATIC150', '%IBM.STATIC149', '%IBM.STATIC148'];
export const ZOS_APPLICATION_IDS = ['%IBM.STATIC006', '%IBM.STATIC007'];

// For metrics --------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

// Don't forget to also modify corresponding map in Go: SupportedAffinitiesForMetrics
export const SUPPORTED_AFFINITIES_FOR_METRICS: AffinityIdToNameAndGroup = {
  ...COMMONLY_SUPPORTED_AFFINITIES,
  '%IBM.KQQ': { name: 'CQM', defaultAllGroup: '*IBM_KQQ' },
};

// For situations -----------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

/** O4SRV ('&IBM.STATIC000') is special ITM framework "application" (technically, a group, cause it starts with `&`) */
export const ITM_FRAMEWORK_AFFINITY_ID = '&IBM.STATIC000';

export const ITM_FRAMEWORK_AFFINITY_ENTITY: AffinityEntity = {
  id: ITM_FRAMEWORK_AFFINITY_ID as AffinityId,
  displayText: 'All Managed Systems',
  productCode: 'UNKNOWN',
  symbol: 'GLOBAL',
};

export const TEMS_AFFINITY_ID = '%IBM.STATIC051';

export const TEMS_AFFINITY_ENTITY: AffinityEntity = {
  id: TEMS_AFFINITY_ID as AffinityId,
  displayText: 'Tivoli Enterprise Monitoring Server',
  productCode: 'UNKNOWN',
  symbol: 'CMS',
};

// Don't forget to also modify corresponding map in Go: SupportedAffinitiesForSituations
export const SUPPORTED_AFFINITIES_FOR_SITUATIONS: AffinityIdToNameAndGroup = {
  ...COMMONLY_SUPPORTED_AFFINITIES,
  [ITM_FRAMEWORK_AFFINITY_ID]: {
    name: ITM_FRAMEWORK_AFFINITY_ENTITY.displayText,
    defaultAllGroup: '', // no need for defaultAllGroup
  },
  [TEMS_AFFINITY_ID]: {
    name: TEMS_AFFINITY_ENTITY.displayText,
    defaultAllGroup: '', // no need for defaultAllGroup
  },
};

// For actions (Take Action) ------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

export const SUPPORTED_AFFINITIES_FOR_ACTIONS = SUPPORTED_AFFINITIES_FOR_SITUATIONS;

// For history configs ------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

// JVM_Plex does not have any supported tables in history configs
export const SUPPORTED_AFFINITIES_FOR_HISTORY_CONFIGS: AffinityIdToNameAndGroup = Object.fromEntries(
  Object.entries(COMMONLY_SUPPORTED_AFFINITIES).filter(([key]) => key !== JVM_PLEX_AFFINITY_ID)
);

// Products ----------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

export type Product = {
  key: string;
  displayName: string;
  affinityIds: AffinityId[];
};

export const PRODUCTS: Product[] = [
  {
    key: 'cics',
    displayName: 'IBM Z OMEGAMON AI for CICS',
    affinityIds: ['%IBM.STATIC011', '%IBM.CICSplex'] as AffinityId[],
  },
  {
    key: 'cicstg',
    displayName: 'IBM Z OMEGAMON AI for CICS Transaction Gateway',
    affinityIds: ['%IBM.STATIC115'] as AffinityId[],
  },
  {
    key: 'db2',
    displayName: 'IBM Z OMEGAMON AI for DB2',
    affinityIds: ['%IBM.STATIC017'] as AffinityId[],
  },
  {
    key: 'ims',
    displayName: 'IBM OMEGAMON for IMS on z/OS',
    affinityIds: ['%IBM.STATIC014'] as AffinityId[],
  },
  {
    key: 'jvm',
    displayName: 'IBM Z OMEGAMON AI for JVM',
    affinityIds: ['%IBM.JVM_Monitor', JVM_PLEX_AFFINITY_ID] as AffinityId[],
  },
  {
    key: 'messaging',
    displayName: 'OMEGAMON for IBM Integration Bus Agent',
    affinityIds: ['%IBM.STATIC154', '%IBM.STATIC128'] as AffinityId[],
  },
  {
    key: 'mq',
    displayName: 'OMEGAMON for IBM MQ agent',
    affinityIds: ['%IBM.STATIC022', '%IBM.STATIC163'] as AffinityId[],
  },
  {
    key: 'networks',
    displayName: 'IBM Z OMEGAMON AI for Networks',
    affinityIds: ['%IBM.STATIC150', '%IBM.STATIC149', '%IBM.STATIC148'] as AffinityId[],
  },
  {
    key: 'storage',
    displayName: 'IBM Z OMEGAMON AI for Storage',
    affinityIds: ['%IBM.STATIC139'] as AffinityId[],
  },
  {
    key: 'zos',
    displayName: 'IBM Z OMEGAMON AI for z/OS',
    affinityIds: ['%IBM.STATIC006', '%IBM.STATIC007'] as AffinityId[],
  },
  {
    key: 'zvm',
    displayName: 'OMEGAMON XE on z/VM and Linux',
    affinityIds: ['%IBM.STATIC101'] as AffinityId[],
  },
  {
    key: 'netview',
    displayName: 'NetView',
    affinityIds: ['%IBM.STATIC002'] as AffinityId[],
  },
];

export function getProductForAffinityId(id: AffinityId): Product | undefined {
  return PRODUCTS.find((g) => g.affinityIds.includes(id));
}

/** For history configs: exclude JVM_Plex from the JVM group */
export function getProductsForHistoryConfigs(): Product[] {
  return PRODUCTS.map((g) =>
    g.key === 'jvm' ? { ...g, affinityIds: g.affinityIds.filter((id) => id !== JVM_PLEX_AFFINITY_ID) } : g
  );
}
