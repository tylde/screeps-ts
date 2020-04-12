// W - WORK – ability to harvest energy, construct and repair structures, upgrade controllers.
// M - MOVE – ability to move.
// C - CARRY – ability to transfer energy.
// A - ATTACK – ability of short-range attack.
// R - RANGED_ATTACK – ability of ranged attack.
// H - HEAL – ability to heal others.
// C - CLAIM - ability to claim territory control.
// R - TOUGH – "empty" part with the sole purpose of defense.

import * as SETTLER_CONSTANTS from './SettlerConstants';

const SETTLER_PATTERNS = {
  [SETTLER_CONSTANTS.SETTLER_CARRIER]: '*[2C1M]',
  [SETTLER_CONSTANTS.SETTLER_MINER]: '^6W1M',
  [SETTLER_CONSTANTS.SETTLER_PIONEER]: '*[1W1C1M]',
  [SETTLER_CONSTANTS.SETTLER_WORKER]: '*[1W1C1M]',
  [SETTLER_CONSTANTS.SETTLER_SCOUT]: '1M',
  [SETTLER_CONSTANTS.SETTLER_WARDEN]: '<TBD>',
  [SETTLER_CONSTANTS.SETTLER_LORD]: '<TBD>'
};

export default SETTLER_PATTERNS;
