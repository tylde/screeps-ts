import Task from '../Task';
import TASK_PRIORITIES from '../config/TaskPriorities';

const TASK_TYPE: TaskType = 'TASK_BUILD_CONTAINER_FOR_MINE';

export default class TaskBuildContainerForMine extends Task {
  constructor(provinceName: string, mineId: string) {
    const type = TASK_TYPE;
    const priority = TASK_PRIORITIES[TASK_TYPE];
    const assignableSettlers: SettlerRole[] = ['SETTLER_WORKER'];

    const customData = {
      mineId
    };

    super(type, provinceName, priority, assignableSettlers, customData);
  }
}
