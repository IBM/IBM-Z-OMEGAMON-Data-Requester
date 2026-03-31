import { type Branded } from 'public-common';

export type AffinityId = Branded<string, 'AffinityId'>;

export type AffinityEntity = {
  id: AffinityId;
  displayText: string;
  productCode: string;
  symbol: string;
};

export const MVS_CICS_AFFINITY_ID = '%IBM.STATIC011';

export type AffinityIdToNameAndGroup = {
  [affinityId: string]: { name: string; defaultAllGroup: string };
};

const SUPPORTED_AFFINITIES_FOR_METRICS_AND_SITUATIONS: AffinityIdToNameAndGroup = {
  [MVS_CICS_AFFINITY_ID]: { name: 'MVS CICS', defaultAllGroup: '*MVS_CICS' },
  '%IBM.CICSplex': { name: 'CICSplex', defaultAllGroup: '*IBM_CICSplex' },
  '%IBM.STATIC115': { name: 'MVS CICSTG', defaultAllGroup: '*MVS_CICSTG' },
  '%IBM.STATIC014': { name: 'IMS Subsystems', defaultAllGroup: '*MVS_IMSPLEX' },
  '%IBM.JVM_Monitor': { name: 'JVM', defaultAllGroup: '*JVM_Monitor' },
  '%IBM.STATIC022': { name: 'MQ Queue Manager', defaultAllGroup: '*MVS_MQM' },
  '%IBM.STATIC163': { name: 'MQ Queue Sharing Group', defaultAllGroup: '*MQ_QSG' },
  '%IBM.STATIC154': { name: 'Integration Bus Broker Node', defaultAllGroup: '*MQSI_BROKER_V7' },
  '%IBM.STATIC128': { name: 'Integration Bus Agent', defaultAllGroup: '*MQSI_AGENT' },
  '%IBM.STATIC150': { name: 'Mainframe Networks', defaultAllGroup: '*OMEGAMONXE_MAINFRAME_NTWK' },
  '%IBM.STATIC149': { name: 'TCP/IP', defaultAllGroup: '*OMEGAMONXE_MAINFRAME_NTWK_TCP' },
  '%IBM.STATIC148': { name: 'VTAM', defaultAllGroup: '*OMEGAMONXE_MAINFRAME_NTWK_VTAM' },
  '%IBM.STATIC017': { name: 'DB2 Subsystems', defaultAllGroup: '*MVS_DB2' },
  '%IBM.STATIC006': { name: 'zOS SYSPLEX', defaultAllGroup: '*MVS_SYSPLEX' },
  '%IBM.STATIC007': { name: 'zOS SYSTEM', defaultAllGroup: '*MVS_SYSTEM' },
  '%IBM.STATIC139': { name: 'Storage Subsystem', defaultAllGroup: '*OMEGAMONXE_SMS' },
  '%IBM.STATIC101': { name: 'ZVM and Linux', defaultAllGroup: '*OMXE_VM' },
};

export const NETWORK_APPLICATION_IDS = ['%IBM.STATIC150', '%IBM.STATIC149', '%IBM.STATIC148'];
export const ZOS_APPLICATION_IDS = ['%IBM.STATIC006', '%IBM.STATIC007'];

// For metrics --------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

export const SUPPORTED_AFFINITIES_FOR_METRICS: AffinityIdToNameAndGroup = {
  ...SUPPORTED_AFFINITIES_FOR_METRICS_AND_SITUATIONS,
  '%IBM.KQQ': { name: 'CQM', defaultAllGroup: '*IBM_KQQ' },
};

// For situations -----------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

/** O4SRV ('&IBM.STATIC000') is special ITM framework "application". For more - see `ITM_FRAMEWORK_APPLICATION` */
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

export const SUPPORTED_AFFINITIES_FOR_SITUATIONS: AffinityIdToNameAndGroup = {
  ...SUPPORTED_AFFINITIES_FOR_METRICS_AND_SITUATIONS,
  [ITM_FRAMEWORK_AFFINITY_ID]: {
    name: ITM_FRAMEWORK_AFFINITY_ENTITY.displayText,
    defaultAllGroup: '', // no need for defaultAllGroup
  },
  [TEMS_AFFINITY_ID]: {
    name: TEMS_AFFINITY_ENTITY.displayText,
    defaultAllGroup: '', // no need for defaultAllGroup
  },
};
