// W - WORK – ability to harvest energy, construct and repair structures, upgrade controllers.
// M - MOVE – ability to move.
// C - CARRY – ability to transfer energy.
// A - ATTACK – ability of short-range attack.
// R - RANGED_ATTACK – ability of ranged attack.
// H - HEAL – ability to heal others.
// L - CLAIM - ability to claim territory control.
// T - TOUGH – "empty" part with the sole purpose of defense.

type SettlerPatterns = {[key in SettlerRole]: string};

const SETTLER_PATTERNS: SettlerPatterns = {
  ['SETTLER_CARRIER']: '*2C*1M',
  ['SETTLER_MINER']: '^6W1M',
  ['SETTLER_PIONEER']: '*1W*1C*1M',
  ['SETTLER_WORKER']: '*1W*1C*1M',
  ['SETTLER_SCOUT']: '1M',
  ['SETTLER_WARDEN']: '1M',
  ['SETTLER_LORD']: '1M'
};

export default SETTLER_PATTERNS;
