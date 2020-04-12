import Log from '../console/Log';

import Link from '../console/Link';
import SettlerUtils from './utils/SettlerUtils';
import Task from '../task/Task';
import TaskBootstrapProvince from '../task/types/TaskBootstrapProvince';
import TaskMineEnergy from '../task/types/TaskMineEnergy';

export default class Settler {
  name: string;
  role: SettlerRole;
  provinceName: string;

  assignedTaskId: string | null;

  taskPhase: string | null;
  lastHitPoints: number;

  constructor(name: string, role: SettlerRole, provinceName: string) {
    this.name = name;
    this.role = role;
    this.provinceName = provinceName;

    this.assignedTaskId = null;

    this.taskPhase = null;
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

  static setLastHitPoints(settlerName: string, hitPoints: number): void {
    const settler: Settler = Settler.get(settlerName);
    const newSettler: Settler = {...settler, lastHitPoints: hitPoints};
    Settler.updateInMemory(settlerName, newSettler);
  }

  static setTaskPhase(settlerName: string, taskPhase: string): void {
    const settler: Settler = Settler.get(settlerName);
    const newSettler: Settler = {...settler, taskPhase};
    Settler.updateInMemory(settlerName, newSettler);
  }

  static unsetTaskPhase(settlerName: string): void {
    const settler: Settler = Settler.get(settlerName);
    const newSettler: Settler = {...settler, taskPhase: null};
    Settler.updateInMemory(settlerName, newSettler);
  }

  static assignTask(settlerName: string, taskId: string): void {
    const settler: Settler = Settler.get(settlerName);
    const newSettler: Settler = {...settler, assignedTaskId: taskId};
    Settler.updateInMemory(settlerName, newSettler);
  }

  static unassignTask(settlerName: string, taskId: string): void {
    const settler: Settler = Settler.get(settlerName);
    const {assignedTaskId} = settler;
    if (taskId !== assignedTaskId) {
      Log.debug(`Tried to unassign wrong task: ${taskId} (creeps assignedTask: ${assignedTaskId})`);
      return;
    }
    const newSettler: Settler = {...settler, assignedTaskId: null};
    Settler.updateInMemory(settlerName, newSettler);
  }

  // ===================================================================================================================

  static notifications(settlerName: string, creep: Creep): void {
    if (SettlerUtils.isAttacked(creep)) {
      Log.warning(`[${Link.toRoom(creep.pos.roomName)}] Creep ${settlerName} has been attacked!`);
    }
  }

  static setStatus(settlerName: string, creep: Creep): void {
    Settler.setLastHitPoints(settlerName, creep.hits);
  }

  static runTask(settlerName: string, creep: Creep): void {
    const settler: Settler = Settler.get(settlerName);
    const {assignedTaskId} = settler;
    if (!assignedTaskId) {
      return;
    }

    const task = Task.get(assignedTaskId);
    if (!task) {
      Log.debug(`[${settlerName}] No task found for assignedTaskId: ${assignedTaskId}`);
      return;
    }

    const {type: taskType, id: taskId} = task;
    switch (taskType) {
      case 'TASK_BOOTSTRAP_PROVINCE':
        TaskBootstrapProvince.run(creep, taskId);
        break;
      case 'TASK_MINE_ENERGY':
        TaskMineEnergy.run(creep, taskId);
        break;
      default:
        Log.debug(`Settler has tried to run unknown task: ${taskType}`);
        break;
    }
  }

  static run(settlerName: string): void {
    const settler: Settler = Settler.get(settlerName);
    if (!settler) {
      Log.warning(`No settler found with name ${settlerName}`);
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

    Settler.notifications(settlerName, creep);
    Settler.runTask(settlerName, creep);
    Settler.setStatus(settlerName, creep);
  }
}
