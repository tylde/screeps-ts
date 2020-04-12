import Task from '../Task';

export default class TaskUtils {
  static isType(task: Task, taskType: TaskType): boolean {
    return task.type === taskType;
  }
}
