import Task from '../Task';
import TASK_PRIORITIES from '../config/TaskPriorities';
import SettlerCommands from '../../settler/utils/SettlerCommands';

const TASK_TYPE: TaskType = 'TASK_SCOUT_DYNAMIC';

export default class TaskScoutDynamic extends Task {
  constructor(provinceName: string) {
    const type = TASK_TYPE;
    const priority = TASK_PRIORITIES[TASK_TYPE];
    const assignableSettlers: SettlerRole[] = ['SETTLER_SCOUT'];

    const data = {};

    super(type, provinceName, priority, assignableSettlers, data);
  }

  static run(creep: Creep, taskId: string): void {
    // TODO find next exit and move to
    SettlerCommands.moveRandomly(creep);
  }
}
