import Log from '../console/Log';

export default class SettlerHandler {
  static get(settlerName: string): CreepMemory {
    return Memory.creeps[settlerName];
  }

  static init(): void {
    Memory.creeps = {};
  }

  static add(settlerName: string, settler: CreepMemory): void {
    Memory.creeps = {...Memory.creeps, [settlerName]: settler};
  }

  static update(settlerName: string, settler: CreepMemory): void {
    Memory.creeps[settlerName] = settler;
  }

  static delete(settlerName: string): void {
    delete Memory.creeps[settlerName];
  }

  // ===================================================================================================================

  static setProvinceName(settlerName: string, provinceName: string): void {
    const settler: CreepMemory = SettlerHandler.get(settlerName);
    const newSettler: CreepMemory = {...settler, provinceName};
    SettlerHandler.update(settlerName, newSettler);
  }

  static setLastHitPoints(settlerName: string, hitPoints: number): void {
    const settler: CreepMemory = SettlerHandler.get(settlerName);
    const newSettler: CreepMemory = {...settler, lastHitPoints: hitPoints};
    SettlerHandler.update(settlerName, newSettler);
  }

  static setTaskPhase(settlerName: string, taskPhase: string): void {
    const settler: CreepMemory = SettlerHandler.get(settlerName);
    const newSettler: CreepMemory = {...settler, taskPhase};
    SettlerHandler.update(settlerName, newSettler);
  }

  static unsetTaskPhase(settlerName: string): void {
    const settler: CreepMemory = SettlerHandler.get(settlerName);
    const newSettler: CreepMemory = {...settler, taskPhase: null};
    SettlerHandler.update(settlerName, newSettler);
  }

  static assignTask(settlerName: string, taskId: string): void {
    const settler: CreepMemory = SettlerHandler.get(settlerName);
    const newSettler: CreepMemory = {...settler, assignedTaskId: taskId};
    SettlerHandler.update(settlerName, newSettler);
  }

  static unassignTask(settlerName: string, taskId: string): void {
    const settler: CreepMemory = SettlerHandler.get(settlerName);
    const {assignedTaskId} = settler;
    if (taskId !== assignedTaskId) {
      Log.debug(`Tried to unassign wrong task: ${taskId} (creeps assignedTask: ${assignedTaskId})`);
      return;
    }
    const newSettler: CreepMemory = {...settler, assignedTaskId: null};
    SettlerHandler.update(settlerName, newSettler);
  }
}
