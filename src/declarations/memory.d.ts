type DistrictType = 'CAPITAL' | 'QUARRY' | 'OUTPOST' | 'FORT' | 'NONE' | 'OCCUPIED';

type SettlerRole = 'PIONEER' | 'MINER';

type TaskType = '' | 'MINE' | 'TRANSPORT';

interface ElementPosition {
  room: string;
  x: number;
  y: number;
}

interface Memory {
  // flags: {[name: string]: FlagMemory};
  realm: RealmMemory;

  provinces: {[name: string]: ProvinceMemory};
  rooms: {[name: string]: RoomMemory};
  spawns: {[name: string]: SpawnMemory};
  creeps: {[name: string]: CreepMemory};

  mines: {[id: string]: MineMemory};
  quarries: {[id: string]: QuarryMemory};

  settings: SettingsMemory;
}

interface RealmMemory {
  provinces: string[];
  initializationTick: number;
}

interface ProvinceMemory {
  name: string;
  capitalName: string;
  garrisons: string[];
  districts: string[];
  settlers: string[];
}

interface RoomMemory {
  name: string;
  provinceName: string;
  type: DistrictType;
  mines: string[];
  quarry: string;
}

interface MineMemory {
  id: string;
  districtName: string;
  position: ElementPosition;
  energyCapacity: number;
}

interface QuarryMemory {
  id: string;
  districtName: string;
  position: ElementPosition;
  mineralType: MineralConstant;
  mineralDensity: number;
}

interface CreepMemory {
  name: string;
  role: SettlerRole;
  provinceName: string;
  currentTask: TaskType;
}

interface SpawnMemory {
  provinceName: string;
}

interface SettingsMemory {
  showDebugLogs: boolean;
}
