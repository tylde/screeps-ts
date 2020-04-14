import Task from '../Task';
import TASK_PRIORITIES from '../config/TaskPriorities';

const TASK_TYPE: TaskType = 'TASK_BUILD_STRUCTURE';

export default class TaskBuildStructure extends Task {
  constructor(provinceName: string, constructionId: string, constructionPosition: ElementPosition) {
    const type = TASK_TYPE;
    const priority = TASK_PRIORITIES[TASK_TYPE];
    const assignableSettlers: SettlerRole[] = ['SETTLER_WORKER'];

    const data = {
      constructionId,
      constructionPosition
    };

    super(type, provinceName, priority, assignableSettlers, data);
  }
}
