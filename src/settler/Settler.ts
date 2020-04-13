import Log from '../console/Log';
import Link from '../console/Link';

import SettlerUtils from './utils/SettlerUtils';

import TaskPioneerProvince from '../task/types/TaskPioneerProvince';

import SettlerHandler from './SettlerHandler';
import TaskHandler from '../task/TaskHandler';
import TaskMineEnergy from '../task/types/TaskMineEnergy';

export default class Settler implements CreepMemory {
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

  static notifications(settlerName: string, creep: Creep): void {
    if (SettlerUtils.isAttacked(creep)) {
      Log.warning(`[${Link.toRoom(creep.pos.roomName)}] Creep ${settlerName} has been attacked!`);
    }
  }

  static setStatus(settlerName: string, creep: Creep): void {
    SettlerHandler.setLastHitPoints(settlerName, creep.hits);
  }

  static runTask(settlerName: string, creep: Creep): void {
    const settler: Settler = SettlerHandler.get(settlerName);
    const {assignedTaskId} = settler;
    if (!assignedTaskId) {
      return;
    }

    const task = TaskHandler.get(assignedTaskId);
    if (!task) {
      Log.debug(`[${settlerName}] No task found for assignedTaskId: ${assignedTaskId}`);
      return;
    }

    const {type: taskType, id: taskId} = task;
    switch (taskType) {
      case 'TASK_PIONEER_PROVINCE':
        TaskPioneerProvince.run(creep, taskId);
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
    const settler: Settler = SettlerHandler.get(settlerName);
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
