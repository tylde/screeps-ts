import Log from '../../console/Log';

import Capital from '../../province/Capital';
import Mine from '../../resources/Mine';

import TaskMineEnergy from '../../task/types/TaskMineEnergy';

import MineHandler from '../../resources/MineHandler';
import ProvinceHandler from '../../province/ProvinceHandler';
import TaskHandler from '../../task/TaskHandler';

export default class MinersGuild {
  static manageTasks(provinceName: string): void {
    const province = ProvinceHandler.get(provinceName);
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

    const unassignedMines: Mine[] = minesIds.map(mineId => MineHandler.get(mineId))
      .filter(mine => mine.assignedTaskId === null);

    unassignedMines.forEach(unassignedMine => {
      const {id: mineId} = unassignedMine;
      const task = new TaskMineEnergy(provinceName, mineId);
      const taskId = task.id;
      ProvinceHandler.addTask(provinceName, taskId);
      TaskHandler.add(taskId, task);
      MineHandler.assignTask(mineId, taskId);
    });
  }

  static calculateRequiredMiners(provinceName: string): number {
    const {tasksIds} = ProvinceHandler.get(provinceName);
    return tasksIds.map(taskId => TaskHandler.get(taskId)).filter(task => task.type === 'TASK_MINE_ENERGY').length;
  }
}
