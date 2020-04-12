import Log from '../console/Log';

export default class Settings {
  showDebugLogs: boolean;

  constructor(showDebugLogs: boolean) {
    this.showDebugLogs = showDebugLogs;
  }

  static setShowDebugLogs(value: boolean): void {
    if (Memory.settings) {
      Memory.settings.showDebugLogs = value;
      Log.info(`showDebugLogs set to ${value}`);
    } else {
      Log.error('Cannot set showDebugLogs: Memory.settings is undefined');
    }
  }

  static init(options: {showDebugLogs: boolean}): void {
    if (!Memory.settings) {
      Memory.settings = new Settings(options.showDebugLogs);
    }
  }
}
