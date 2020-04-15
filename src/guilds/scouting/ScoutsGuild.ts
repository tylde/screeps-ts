import ProvinceHandler from '../../province/ProvinceHandler';
import TaskHandler from '../../task/TaskHandler';
import TaskScoutDynamic from '../../task/types/TaskScoutDynamic';

export default class ScoutsGuild {
  static manageTasks(provinceName: string): void {
    const {tasksIds} = ProvinceHandler.get(provinceName);
    const dynamicScoutTasks = tasksIds.map(taskId => TaskHandler.get(taskId))
      .filter(task => task.type === 'TASK_SCOUT_DYNAMIC').length;

    for (let i = dynamicScoutTasks; i < 3; i++) {
      const task = new TaskScoutDynamic(provinceName);
      const taskId = task.id;
      ProvinceHandler.addTask(provinceName, taskId);
      TaskHandler.add(taskId, task);
    }
  }

  static calculateRequiredScouts(provinceName: string): number {
    const {tasksIds} = ProvinceHandler.get(provinceName);
    return tasksIds.map(taskId => TaskHandler.get(taskId)).filter(task => task.type === 'TASK_SCOUT_DYNAMIC').length;
  }
}
