export default class DistrictHandler {
  static get(districtName: string): RoomMemory {
    return Memory.rooms[districtName];
  }

  static init(): void {
    Memory.rooms = {};
  }

  static add(districtName: string, district: RoomMemory): void {
    Memory.rooms = {...Memory.rooms, [districtName]: district};
  }

  static update(districtName: string, district: RoomMemory): void {
    Memory.rooms[districtName] = district;
  }

  static delete(districtName: string): void {
    delete Memory.rooms[districtName];
  }

  // ===================================================================================================================

  static setProvinceName(mineId: string, type: DistrictType): void {
    const mine: RoomMemory = DistrictHandler.get(mineId);
    const updatedDistrict: RoomMemory = {...mine, type};
    DistrictHandler.update(mineId, updatedDistrict);
  }
}
