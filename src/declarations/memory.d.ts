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
  provincesNames: string[];
  initializationTick: number;
}

interface ProvinceMemory {
  name: string;
  capitalName: string;
  garrisonsNames: string[];
  districtsNames: string[];
  settlersNames: string[];

  requiredSettlers: {[key in SettlerRole]: number};

  minesIds: string[];
  quarriesIds: string[];

  directivesIds: string[];
  tasksIds: string[];
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
  assignedTaskId: string | null;
  containerId: string | null;
  linkId: string | null;
}

interface QuarryMemory {
  id: string;
  districtName: string;
  position: ElementPosition;
  mineralType: MineralConstant;
  mineralDensity: number;

  provinceName: string | null;
  assignedTaskId: string | null;
  containerId: string | null;
  linkId: string | null;
}

interface CreepMemory {
  name: string;
  role: SettlerRole;
  provinceName: string;

  assignedTaskId: string | null;

  taskPhase: string | null;
  lastHitPoints: number;
}

interface DirectiveMemory {
  id: string;
  type: string;
  priority: number;
}

interface TaskData {
  [key: string]: any;
}

interface TaskMemory {
  id: string;
  type: TaskType;
  provinceName: string;
  priority: number;
  assignableSettlers: SettlerRole[];
  data: TaskData;

  assignedSettlerName: string | null;
  isDone: boolean;
}

interface SpawnMemory {
  provinceName: string;
}

interface SettingsMemory {
  showDebugLogs: boolean;
}
