export default class Log {
  private static messageType(string: string, color: string): string {
    return `<span style="color: ${color}"'>${string}</span>`;
  }

  static error(message: string): void {
    const type = this.messageType('ERROR', '#E74C3C');
    console.log(`${type}: ${message}`);
  }

  static warning(message: string): void {
    const type = this.messageType('WARNING', '#F39C12');
    console.log(`${type}: ${message}`);
  }

  static success(message: string): void {
    const type = this.messageType('SUCCESS', '#27AE60');
    console.log(`${type}: ${message}`);
  }

  static info(message: string): void {
    const type = this.messageType('INFO', '#3498DB');
    console.log(`${type}: ${message}`);
  }

  static debug(message: string): void {
    const type = this.messageType('DEBUG', '#9B59B6');
    if (Memory.settings.showDebugLogs) {
      console.log(`${type}: ${message}`);
    }
  }
}
