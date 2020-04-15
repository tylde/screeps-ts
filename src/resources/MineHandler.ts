import Log from '../console/Log';

export default class MineHandler {
  static get(mineId: string): MineMemory {
    return Memory.mines[mineId];
  }

  static init(): void {
    Memory.mines = {};
  }

  static add(mineId: string, mine: MineMemory): void {
    Memory.mines = {...Memory.mines, [mineId]: mine};
  }

  static update(mineId: string, mine: MineMemory): void {
    Memory.mines[mineId] = mine;
  }

  static delete(mineId: string): void {
    delete Memory.mines[mineId];
  }

  // ===================================================================================================================

  static setProvinceName(mineId: string, setProvinceName: string): void {
    const mine: MineMemory = MineHandler.get(mineId);
    const updatedMine: MineMemory = {...mine, provinceName: setProvinceName};
    MineHandler.update(mineId, updatedMine);
  }

  static assignTask(mineId: string, taskId: string): void {
    const mine: MineMemory = MineHandler.get(mineId);
    const updatedMine: MineMemory = {...mine, assignedTaskId: taskId};
    MineHandler.update(mineId, updatedMine);
  }

  static unassignTask(mineId: string, taskId: string): void {
    const mine: MineMemory = MineHandler.get(mineId);
    const {assignedTaskId} = mine;
    if (taskId !== assignedTaskId) {
      Log.debug(`Tried to unassign wrong task: ${mineId} (mine assignedTaskId: ${assignedTaskId})`);
      return;
    }
    const updatedMine: MineMemory = {...mine, assignedTaskId: null};
    MineHandler.update(mineId, updatedMine);
  }

  // ===================================================================================================================

  static updateCurrentCycleEnergy(mineId: string, minedEnergy: number): void {
    const mine: MineMemory = MineHandler.get(mineId);
    const updatedMine: MineMemory = {...mine, currentCycleEnergy: mine.currentCycleEnergy + minedEnergy};
    MineHandler.update(mineId, updatedMine);
  }

  static updateCycleEnergy(mineId: string): void {
    const mine: MineMemory = MineHandler.get(mineId);
    const {currentCycleEnergy, lastTenCyclesEnergy} = mine;

    lastTenCyclesEnergy.push(currentCycleEnergy);
    if (lastTenCyclesEnergy.length > 10) {
      lastTenCyclesEnergy.shift();
    }

    const updatedMine: MineMemory = {...mine, currentCycleEnergy: 0, lastCycleEnergy: currentCycleEnergy};
    MineHandler.update(mineId, updatedMine);
  }
}
