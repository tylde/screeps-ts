import Log from '../console/Log';

export default class Settings {
  showDebugLogs: boolean;

  constructor() {
    this.showDebugLogs = false;
  }

  static setShowDebugLogs(value: boolean): void {
    if (Memory.settings) {
      Memory.settings.showDebugLogs = value;
      Log.info(`showDebugLogs set to ${value}`);
    } else {
      Log.error('Cannot set showDebugLogs: Memory.settings is undefined');
    }
  }

  static init(): void {
    if (!Memory.settings) {
      Memory.settings = new Settings();
    }
  }
}
