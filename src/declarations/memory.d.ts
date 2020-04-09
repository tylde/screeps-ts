type DistrictType = 'CAPITAL' | 'QUARRY' | 'OUTPOST' | 'FORT' | 'NONE' | 'OCCUPIED';

type SettlerRole = 'PIONEER' | 'MINER';

type TaskType = '';

interface Memory {
  flags: {[name: string]: FlagMemory};
  rooms: {[name: string]: RoomMemory};
  spawns: {[name: string]: SpawnMemory};

  creeps: {[name: string]: SettlerMemory};

  realm: RealmMemory;
  provinces: {[name: string]: ProvinceMemory};
  districts: {[name: string]: DistrictMemory};
  settlers: {[name: string]: SettlerMemory};

  settings: SettingsMemory;
}

interface RealmMemory {
  provinces: string[];
  initializationTick: number;
}

interface ProvinceMemory {
  name: string;
  capitalName: string;
  garrisonName: string;
  districts: string[];
  settlers: string[];

  plannedStructures: any[];
}

interface DistrictMemory {
  name: string;
  provinceName: string;
  type: DistrictType;
}

interface RoomMemory {
  name: string;
  provinceName: string;
  type: DistrictType;
}

interface SettlerMemory {
  name: string;
  role: SettlerRole;
  provinceName: string;
  task: TaskType;
}

interface CreepMemory {
  name: string;
  role: SettlerRole;
  provinceName: string;
  task: TaskType;
}

interface SettingsMemory {
  showDebugLogs: boolean;
}
