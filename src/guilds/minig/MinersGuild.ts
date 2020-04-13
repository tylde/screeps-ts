import Province from '../../province/Province';
import Capital from '../../province/Capital';
import Log from '../../console/Log';
import Mine from '../../resources/Mine';
import TaskMineEnergy from '../../task/types/TaskMineEnergy';
import Task from '../../task/Task';

export default class MinersGuild {
  static manageTasks(provinceName: string): void {
    const province = Province.get(provinceName);
    const {capitalName, minesIds} = province;
    const capitalRoom = Capital.getCapitalRoom(capitalName);
    if (!capitalRoom) {
      Log.debug(`[${provinceName}] Cannot find capitalRoom for capitalName: ${capitalName}`);
      return;
    }
    const controller = capitalRoom.controller;
    if (!controller) {
      Log.debug(`[${provinceName}] Cannot find controller for capitalName: ${capitalName}`);
      return;
    }

    const unassignedMines: Mine[] = minesIds.map(mineId => Mine.get(mineId))
      .filter(mine => mine.assignedTaskId === null);

    unassignedMines.forEach(unassignedMine => {
      const {id: mineId} = unassignedMine;
      const task = new TaskMineEnergy(provinceName, mineId);
      const taskId = task.id;
      Province.addTask(provinceName, taskId);
      Task.addToMemory(taskId, task);
      Mine.assignTask(mineId, taskId);
    });
  }
}
