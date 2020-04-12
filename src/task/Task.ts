import Log from '../console/Log';
import Utils from '../utils/utils';

export default class Task {
  id: string;
  type: TaskType;
  provinceName: string;
  priority: number;
  assignableSettlers: SettlerRole[];
  data: TaskData;

  assignedSettler: string | null;
  done: boolean;

  constructor(
    type: TaskType,
    provinceName: string,
    priority: number,
    assignableSettlers: SettlerRole[],
    data: TaskData
  ) {
    this.id = Task.generateTaskId(type);
    this.type = type;
    this.priority = priority;
    this.provinceName = provinceName;
    this.assignableSettlers = assignableSettlers;
    this.data = data;

    this.assignedSettler = null;
    this.done = false;
  }

  static generateTaskId(type: TaskType): string {
    const taskAmount: number = Task.getTaskAmount(type);

    for (let i = 1; i <= taskAmount + 1; i++) {
      const potentialName = `${type}_${i}`;
      if (!(potentialName in Memory.tasks)) {
        return potentialName;
      }
    }
    return Utils.generateUUID();
  }

  static getTaskAmount(taskType?: TaskType): number {
    if (!taskType) {
      return Object.values(Memory.tasks).length;
    }
    return Object.values(Memory.tasks).filter(task => task.type === taskType).length;
  }

  // ===================================================================================================================

  static get(taskId: string): Task {
    return Memory.tasks[taskId];
  }

  static initTasks(): void {
    Memory.tasks = {};
  }

  static addToMemory(taskId: string, province: Task): void {
    Memory.tasks = {...Memory.tasks, [taskId]: province};
  }

  static updateInMemory(taskId: string, province: Task): void {
    Memory.tasks[taskId] = province;
  }

  static deleteFromMemory(taskId: string): void {
    delete Memory.provinces[taskId];
  }

  // ===================================================================================================================

  static assignSettler(taskId: string, settlerName: string): void {
    const task: Task = Task.get(taskId);
    const newTask: Task = {...task, assignedSettler: settlerName};
    Task.updateInMemory(taskId, newTask);
  }

  static unassignTask(taskId: string, settlerName: string): void {
    const task: Task = Task.get(taskId);
    const {assignedSettler} = task;
    if (settlerName !== assignedSettler) {
      Log.debug(`Tried to unassign wrong settler: ${taskId} (task assignedSettler: ${assignedSettler})`);
      return;
    }
    const newTask: Task = {...task, assignedSettler: null};
    Task.updateInMemory(taskId, newTask);
  }
}
