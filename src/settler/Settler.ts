import Log from '../console/Log';

import Pioneer from './Pioneer';

export default class Settler {
  name: string;
  role: SettlerRole;
  provinceName: string;
  currentTask: TaskType;

  constructor(name: string, role: SettlerRole, provinceName: string) {
    this.name = name;
    this.provinceName = provinceName;
    this.role = role;
    this.currentTask = '';
  }

  // ===================================================================================================================

  static get(settlerName: string): Settler {
    return Memory.creeps[settlerName];
  }

  static initSettlers(): void {
    Memory.creeps = {};
  }

  static addToMemory(settlerName: string, settler: Settler): void {
    Memory.creeps = {...Memory.creeps, [settlerName]: settler};
  }

  static updateInMemory(settlerName: string, settler: Settler): void {
    Memory.creeps[settlerName] = settler;
  }

  static deleteFromMemory(settlerName: string): void {
    delete Memory.creeps[settlerName];
  }

  // ===================================================================================================================

  static setProvinceName(settlerName: string, provinceName: string): void {
    const settler: Settler = Settler.get(settlerName);
    const newSettler: Settler = {...settler, provinceName};
    Settler.updateInMemory(settlerName, newSettler);
  }

  static setRole(settlerName: string, role: SettlerRole): void {
    const settler: Settler = Settler.get(settlerName);
    const newSettler: Settler = {...settler, role};
    Settler.updateInMemory(settlerName, newSettler);
  }

  static setCurrentTask(settlerName: string, currentTask: TaskType): void {
    const settler: Settler = Settler.get(settlerName);
    const newSettler: Settler = {...settler, currentTask};
    Settler.updateInMemory(settlerName, newSettler);
  }

  // ===================================================================================================================

  static run(settlerName: string): void {
    const settler: Settler = Settler.get(settlerName);
    if (!settler) {
      Log.warning(`No settler found with name ${settlerName}`);
    }

    const creep: Creep = Game.creeps[settlerName];

    if (creep.spawning) {
      return;
    }

    if (!creep) {
      Log.warning(`No creep found with name ${settlerName}`);
    }

    const {role} = settler;
    if (role === 'PIONEER') {
      Pioneer.run(creep);
    }
  }
}
