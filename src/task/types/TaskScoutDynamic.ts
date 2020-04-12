import Task from '../Task';
import TASK_PRIORITIES from '../config/TaskPriorities';

import {TASK_SCOUT_DYNAMIC} from '../config/TasksConstants';

const TASK_TYPE = TASK_SCOUT_DYNAMIC;

export default class TaskScoutDynamic extends Task {
  constructor(provinceName: string) {
    const type = TASK_TYPE;
    const priority = TASK_PRIORITIES[TASK_TYPE];
    const assignableSettlers: SettlerRole[] = ['SETTLER_SCOUT'];

    const data = {};

    super(type, provinceName, priority, assignableSettlers, data);
  }

  static run(creep: Creep, taskId: string): void {
    console.log(creep, taskId);
  }
}
