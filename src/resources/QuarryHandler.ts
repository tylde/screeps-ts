export default class QuarryHandler {
  static get(quaryName: string): QuarryMemory {
    return Memory.quarries[quaryName];
  }

  static init(): void {
    Memory.quarries = {};
  }

  static add(quarryId: string, quarry: QuarryMemory): void {
    Memory.quarries = {...Memory.quarries, [quarryId]: quarry};
  }

  static update(quarryId: string, quarry: QuarryMemory): void {
    Memory.quarries[quarryId] = quarry;
  }

  static delete(quarryId: string): void {
    delete Memory.quarries[quarryId];
  }

  static setProvinceName(quarryId: string, setProvinceName: string): void {
    const quarry: QuarryMemory = QuarryHandler.get(quarryId);
    const updatedQuarry: QuarryMemory = {...quarry, provinceName: setProvinceName};
    QuarryHandler.update(quarryId, updatedQuarry);
  }
}
