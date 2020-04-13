import Capital from '../../province/Capital';
import Log from '../../console/Log';
import DistrictUtils from '../../district/utils/DistrictUtils';
import Task from '../../task/Task';
import TaskUtils from '../../task/utils/TaskUtils';
import TaskPioneerProvince from '../../task/types/TaskPioneerProvince';
import Province from '../../province/Province';

export default class PioneersGuild {
  static manageTasks(provinceName: string): void {
    const province = Province.get(provinceName);
    const {capitalName, tasksIds} = province;
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

    const minersAmount = Province.getSettlersAmount(provinceName, 'SETTLER_MINER');
    const carriersAmount = Province.getSettlersAmount(provinceName, 'SETTLER_CARRIER');
    const storedEnergyInCapital = DistrictUtils.getStorageEnergy(capitalRoom);

    const {level: controllerLevel} = controller;
    let requiredTasks = 0;
    if (controllerLevel < 3 || (minersAmount === 0 && carriersAmount === 0) || storedEnergyInCapital < 1000) {
      requiredTasks = 2;
    }

    const currentTasks: Task[] = tasksIds
      .map((taskId) => Task.get(taskId))
      .filter(task => TaskUtils.isType(task, 'TASK_PIONEER_PROVINCE'));

    for (let i = currentTasks.length; i < requiredTasks; i++) {
      const task = new TaskPioneerProvince(provinceName);
      const taskId = task.id;

      Task.addToMemory(taskId, task);
      Province.addTask(provinceName, taskId);
    }
  }
}
