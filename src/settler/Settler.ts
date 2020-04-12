import Log from '../console/Log';

import Link from '../console/Link';
import SettlerUtils from './utils/SettlerUtils';
import Task from '../task/Task';
import TaskBootstrapProvince from '../task/types/TaskBootstrapProvince';

export default class Settler {
  name: string;
  role: SettlerRole;
  provinceName: string;
  assignedTask: string | null;
  currentTask: string;
  lastHitPoints: number;

  constructor(name: string, role: SettlerRole, provinceName: string) {
    this.name = name;
    this.provinceName = provinceName;
    this.role = role;
    this.assignedTask = null;
    this.currentTask = '';
    this.lastHitPoints = 0;
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

  static setCurrentTask(settlerName: string, currentTask: string): void {
    const settler: Settler = Settler.get(settlerName);
    const newSettler: Settler = {...settler, currentTask};
    Settler.updateInMemory(settlerName, newSettler);
  }

  static setLastHitPoints(settlerName: string, hitPoints: number): void {
    const settler: Settler = Settler.get(settlerName);
    const newSettler: Settler = {...settler, lastHitPoints: hitPoints};
    Settler.updateInMemory(settlerName, newSettler);
  }

  static assignTask(settlerName: string, taskId: string): void {
    const settler: Settler = Settler.get(settlerName);
    const newSettler: Settler = {...settler, assignedTask: taskId};
    Settler.updateInMemory(settlerName, newSettler);
  }

  static unassignTask(settlerName: string, taskId: string): void {
    const settler: Settler = Settler.get(settlerName);
    const {assignedTask} = settler;
    if (taskId !== assignedTask) {
      Log.debug(`Tried to unassign wront task: ${taskId} (creeps assignedTask: ${assignedTask})`);
      return;
    }
    const newSettler: Settler = {...settler, assignedTask: null};
    Settler.updateInMemory(settlerName, newSettler);
  }

  // ===================================================================================================================

  static run(settlerName: string): void {
    const settler: Settler = Settler.get(settlerName);
    if (!settler) {
      Log.warning(`No settler found with name ${settlerName}`);
      return;
    }

    const {assignedTask} = settler;
    if (!assignedTask) {
      return;
    }

    const creep: Creep = Game.creeps[settlerName];
    if (!creep) {
      Log.warning(`No creep found with name ${settlerName}`);
      return;
    }

    if (SettlerUtils.isSpawning(creep)) {
      return;
    }

    if (SettlerUtils.isAttacked(creep)) {
      Log.warning(`[${Link.toRoom(creep.pos.roomName)}] Creep ${creep.name} has been attacked!`);
    }

    // TODO RUN ASSIGNED TASK
    const task = Task.get(assignedTask);
    if (!task) {
      return;
    }

    const {type: taskType, id: taskId} = task;
    switch (taskType) {
    case 'TASK_BOOTSTRAP_PROVINCE':
      TaskBootstrapProvince.run(creep, taskId);
      break;
    default:
      Log.debug(`Settler has tried to run unknown task: ${taskType}`);
      break;
    }

    Settler.setLastHitPoints(settlerName, creep.hits);
  }
}
