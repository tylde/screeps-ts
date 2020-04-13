// W - WORK – ability to harvest energy, construct and repair structures, upgrade controllers.
// M - MOVE – ability to move.
// C - CARRY – ability to transfer energy.
// A - ATTACK – ability of short-range attack.
// R - RANGED_ATTACK – ability of ranged attack.
// H - HEAL – ability to heal others.
// C - CLAIM - ability to claim territory control.
// R - TOUGH – "empty" part with the sole purpose of defense.

import * as SETTLER_CONSTANTS from './SettlerConstants';

// TODO make method to calculate creep body to spawn from pattern and garrison availableEnergyCapacity
// const SETTLER_PATTERNS = {
//   [SETTLER_CONSTANTS.SETTLER_CARRIER]: '*[2C1M]',
//   [SETTLER_CONSTANTS.SETTLER_MINER]: '^6W1M',
//   [SETTLER_CONSTANTS.SETTLER_PIONEER]: '*[1W1C1M]',
//   [SETTLER_CONSTANTS.SETTLER_WORKER]: '*[1W1C1M]',
//   [SETTLER_CONSTANTS.SETTLER_SCOUT]: '1M',
//   [SETTLER_CONSTANTS.SETTLER_WARDEN]: '<TBD>',
//   [SETTLER_CONSTANTS.SETTLER_LORD]: '<TBD>'
// };

type SettlerPatternsType = {[key in SettlerRole]: BodyPartConstant[]};

const SETTLER_PATTERNS: SettlerPatternsType = {
  [SETTLER_CONSTANTS.SETTLER_CARRIER]: [CARRY, MOVE],
  [SETTLER_CONSTANTS.SETTLER_MINER]: [WORK, WORK, MOVE],
  [SETTLER_CONSTANTS.SETTLER_PIONEER]: [CARRY, WORK, MOVE],
  [SETTLER_CONSTANTS.SETTLER_WORKER]: [CARRY, WORK, MOVE],
  [SETTLER_CONSTANTS.SETTLER_SCOUT]: [MOVE],
  [SETTLER_CONSTANTS.SETTLER_WARDEN]: [MOVE],
  [SETTLER_CONSTANTS.SETTLER_LORD]: [MOVE]
};

class SettlerPatterns {
  static calculateBodyToSpawn(settlerRole: SettlerRole): BodyPartConstant[] {
    return SETTLER_PATTERNS[settlerRole];
  }
}

export default SettlerPatterns;
