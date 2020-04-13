export default class GarrisonHandler {
  static get(garrisonName: string): SpawnMemory {
    return Memory.spawns[garrisonName];
  }

  static init(): void {
    Memory.spawns = {};
  }

  static add(garrisonName: string, garrison: SpawnMemory): void {
    Memory.spawns = {...Memory.spawns, [garrisonName]: garrison};
  }

  static update(garrisonName: string, garrison: SpawnMemory): void {
    Memory.spawns[garrisonName] = garrison;
  }

  static delete(garrisonName: string): void {
    delete Memory.spawns[garrisonName];
  }
}
