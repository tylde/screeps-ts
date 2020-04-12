interface ElementCoordinates {
  x: number;
  y: number;
}

interface ElementPosition extends ElementCoordinates {
  roomName: string;
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

  directives: {[id: string]: DirectiveMemory};
  tasks: {[id: string]: TaskMemory};

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

  mines: string[];
  quarries: string[];

  directives: string[];
  tasks: string[];
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
  availableMinePositions: ElementPosition[];

  provinceName: string | null;
  assignedTask: string | null;
  containerId: string | null;
}

interface QuarryMemory {
  id: string;
  districtName: string;
  position: ElementPosition;
  mineralType: MineralConstant;
  mineralDensity: number;
  assignedCreeps: string[];
  containerId: string | null;
}

interface CreepMemory {
  name: string;
  role: SettlerRole;
  provinceName: string;
  assignedTask: string | null;
  currentTask: string;
  lastHitPoints: number;
}

interface DirectiveMemory {
  id: string;
  type: string;
  priority: number;
}

interface TaskData {
  mineId?: string;
  fromId?: string;
  toId?: string;
}

interface TaskMemory {
  id: string;
  type: TaskType;
  provinceName: string;
  priority: number;
  assignableSettlers: SettlerRole[];
  data: TaskData;

  assignedSettler: string | null;
  done: boolean;
}

interface SpawnMemory {
  provinceName: string;
}

interface SettingsMemory {
  showDebugLogs: boolean;
}
