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

  static assignTask(mineId: string, taskId: string): void {
    const mine: MineMemory = MineHandler.get(mineId);
    const newMine: MineMemory = {...mine, assignedTaskId: taskId};
    MineHandler.update(mineId, newMine);
  }

  static unassignTask(mineId: string, taskId: string): void {
    const mine: MineMemory = MineHandler.get(mineId);
    const {assignedTaskId} = mine;
    if (taskId !== assignedTaskId) {
      Log.debug(`Tried to unassign wrong task: ${mineId} (mine assignedTaskId: ${assignedTaskId})`);
      return;
    }
    const newMine: MineMemory = {...mine, assignedTaskId: null};
    MineHandler.update(mineId, newMine);
  }
}
