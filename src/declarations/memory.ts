interface Memory {
  creeps: {[name: string]: CreepMemory};
  flags: {[name: string]: FlagMemory};
  rooms: {[name: string]: RoomMemory};
  spawns: {[name: string]: SpawnMemory};
  realm: RealmInterface;
  provinces: {[name: string]: ProvinceMemory};
}

interface CreepMemory {
  role: string;
}

interface RealmInterface {
  provinces: string[];
  initializationTick: number;
}

interface ProvinceMemory {
  name: string;
  capital: string;
  districts: string[];
  settlers: string[];
}
