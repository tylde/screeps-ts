class MemoryHandler {
  static init(): void {
    //
  }

  static clean(): void {
    this.cleanCreeps();
  }

  static cleanCreeps(): void {
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        delete Memory.creeps[name];
      }
    }
  }
}

export default MemoryHandler;
