import Log from '../console/Log';

export default class TaskHandler {
  static get(taskId: string): TaskMemory {
    return Memory.tasks[taskId];
  }

  static init(): void {
    Memory.tasks = {};
  }

  static add(taskId: string, province: TaskMemory): void {
    Memory.tasks = {...Memory.tasks, [taskId]: province};
  }

  static update(taskId: string, province: TaskMemory): void {
    Memory.tasks[taskId] = province;
  }

  static delete(taskId: string): void {
    delete Memory.provinces[taskId];
  }

  // ===================================================================================================================

  static assignSettler(taskId: string, settlerName: string): void {
    const task: TaskMemory = TaskHandler.get(taskId);
    const updatedTask: TaskMemory = {...task, assignedSettlerName: settlerName};
    TaskHandler.update(taskId, updatedTask);
  }

  static unassignTask(taskId: string, settlerName: string): void {
    const task: TaskMemory = TaskHandler.get(taskId);
    const {assignedSettlerName} = task;
    if (settlerName !== assignedSettlerName) {
      Log.debug(`Tried to unassign wrong settler: ${taskId} (task assignedSettler: ${assignedSettlerName})`);
      return;
    }
    const updatedTask: TaskMemory = {...task, assignedSettlerName: null};
    TaskHandler.update(taskId, updatedTask);
  }
}
