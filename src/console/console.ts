import Settings from '../settings/Settings';

class ScreepsConsole {
  static init(): void {
    global.printObject = this.printObject;
    global.setShowDebugLogs = this.setShowDebugLogs;
    global.order = this.order;
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
}

export default ScreepsConsole;
