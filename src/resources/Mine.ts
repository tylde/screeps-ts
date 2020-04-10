export default class Mine {
  id: string;
  districtName: string;
  position: ElementPosition;
  energyCapacity: number;

  constructor(id: string, districtName: string, position: ElementPosition, energyCapacity: number) {
    this.id = id;
    this.districtName = districtName;
    this.position = position;
    this.energyCapacity = energyCapacity;
  }

  // ===================================================================================================================

  static get(mineName: string): Mine {
    return Memory.mines[mineName];
  }

  static initMines(): void {
    Memory.mines = {};
  }

  static addToMemory(mineId: string, mine: Mine): void {
    Memory.mines = {...Memory.mines, [mineId]: mine};
  }

  static updateInMemory(mineId: string, mine: Mine): void {
    Memory.mines[mineId] = mine;
  }

  static deleteFromMemory(mineId: string): void {
    delete Memory.mines[mineId];
  }

  // ===================================================================================================================
}
