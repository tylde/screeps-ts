export default class Quarry {
  id: string;
  districtName: string;
  position: ElementPosition;
  mineralType: MineralConstant;
  mineralDensity: number;
  assignedCreeps: string[];
  containerId: string | null;

  constructor(
    id: string, districtName: string, position: ElementPosition, mineralType: MineralConstant, mineralDensity: number
  ) {
    this.id = id;
    this.districtName = districtName;
    this.position = position;
    this.mineralType = mineralType;
    this.mineralDensity = mineralDensity;
    this.assignedCreeps = [];
    this.containerId = null;
  }

  // ===================================================================================================================

  static get(quaryName: string): Quarry {
    return Memory.quarries[quaryName];
  }

  static initQuarries(): void {
    Memory.quarries = {};
  }

  static addToMemory(quarryId: string, quarry: Quarry): void {
    Memory.quarries = {...Memory.quarries, [quarryId]: quarry};
  }

  static updateInMemory(quarryId: string, quarry: Quarry): void {
    Memory.quarries[quarryId] = quarry;
  }

  static deleteFromMemory(quarryId: string): void {
    delete Memory.quarries[quarryId];
  }

  // ===================================================================================================================
}
