import Settings from '../settings/Settings';
import GarbageCollector from '../memory/GarbageCollector';

class ScreepsConsole {
  static init(): void {
    global.printObject = this.printObject;
    global.setShowDebugLogs = this.setShowDebugLogs;
    global.order = this.order;
    global.deleteTask = this.deleteTask;
  }

  static printObject(): string {
    return 'NOT IMPLEMENTED';
  }

  static setShowDebugLogs(value: boolean): void {
    Settings.setShowDebugLogs(value);
  }

  static order(): string {
    return 'NOT IMPLEMENTED';
  }

  static deleteTask(taskId: string): void {
    GarbageCollector.deleteTask(taskId);
  }
}

export default ScreepsConsole;
