import * as SETTLER_CONSTANTS from './SettlerConstants';

type SettlerNames = {[key in SettlerRole]: string};

const SETTLER_NAMES: SettlerNames = {
  [SETTLER_CONSTANTS.SETTLER_CARRIER]: 'Carrier', // CR
  [SETTLER_CONSTANTS.SETTLER_MINER]: 'Miner', // MR
  [SETTLER_CONSTANTS.SETTLER_PIONEER]: 'Pioneer', // PR
  [SETTLER_CONSTANTS.SETTLER_WORKER]: 'Worker', // WR
  [SETTLER_CONSTANTS.SETTLER_SCOUT]: 'Scout', // SC
  [SETTLER_CONSTANTS.SETTLER_WARDEN]: 'Warden', // WN
  [SETTLER_CONSTANTS.SETTLER_LORD]: 'Lord' // LD
};

export default SETTLER_NAMES;
