type SettlerNames = {[key in SettlerRole]: string};

const SETTLER_NAMES: SettlerNames = {
  SETTLER_CARRIER: 'Carrier', // CR
  SETTLER_MINER: 'Miner', // MR
  SETTLER_PIONEER: 'Pioneer', // PR
  SETTLER_WORKER: 'Worker', // WR
  SETTLER_SCOUT: 'Scout', // SC
  SETTLER_WARDEN: 'Warden', // WN
  SETTLER_LORD: 'Lord', // LD
  SETTLER_DIPLOMAT: 'Diplomat' // DT
};

export default SETTLER_NAMES;
