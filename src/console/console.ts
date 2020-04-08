class ScreepsConsole {
  static init(): void {
    global.printObject = this.printObject;
    global.order = this.order;
  }

  static printObject(): string {
    return 'NOT IMPLEMENTED';
  }

  static order(): string {
    return 'NOT IMPLEMENTED';
  }
}

export default ScreepsConsole;
