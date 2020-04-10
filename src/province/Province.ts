import Log from '../console/Log';

import Garrison from '../garrison/Garrison';
import Settler from '../settler/Settler';

export default class Province {
  name: string;
  capitalName: string;
  garrisons: string[];
  districts: string[];
  settlers: string[];

  constructor(name: string, garrison: StructureSpawn) {
    this.name = name;
    this.capitalName = garrison.room.name;
    this.garrisons = [garrison.name];
    this.districts = [garrison.room.name];
    this.settlers = [];
  }

  // ===================================================================================================================

  static get(provinceName: string): Province {
    return Memory.provinces[provinceName];
  }

  static initProvinces(): void {
    Memory.provinces = {};
  }

  static addToMemory(provinceName: string, province: Province): void {
    Memory.provinces = {...Memory.provinces, [provinceName]: province};
  }

  static updateInMemory(provinceName: string, province: Province): void {
    Memory.provinces[provinceName] = province;
  }

  static deleteFromMemory(provinceName: string): void {
    delete Memory.provinces[provinceName];
  }

  // ===================================================================================================================

  static addDistrict(provinceName: string, districtName: string): void {
    const province = Province.get(provinceName);
    const {districts} = province;
    const newDistricts: string[] = [...districts, districtName];
    Memory.provinces[provinceName] = {...province, districts: newDistricts};
  }

  static deleteDistrict(provinceName: string, districtName: string): void {
    const province = Province.get(provinceName);
    const {districts} = province;

    const districtIndex: number = districts.findIndex((element) => element === districtName);
    if (districtIndex > -1) {
      const newDistricts: string[] = [...districts.slice(0, districtIndex), ...districts.slice(districtIndex + 1)];
      Memory.provinces[provinceName] = {...province, districts: newDistricts};
    } else {
      Log.warning(`District ${districtName} not found in province ${provinceName} while deleting`);
    }
  }

  static hasDistrict(provinceName: string, districtName: string): boolean {
    const province = Province.get(provinceName);
    const {districts} = province;
    const districtIndex: number = districts.findIndex((element) => element === districtName);
    return districtIndex > -1;
  }

  static getDistrictsAmount(provinceName: string): number {
    const province = Province.get(provinceName);
    const {districts} = province;
    return districts.length;
  }

  static addSettler(provinceName: string, settlerName: string): void {
    const province = Province.get(provinceName);
    const {settlers} = province;
    const newSettlers: string[] = [...settlers, settlerName];
    Memory.provinces[provinceName] = {...province, settlers: newSettlers};
  }

  static deleteSettler(provinceName: string, settlerName: string): void {
    const province = Province.get(provinceName);
    const {settlers} = province;

    const settlerIndex: number = settlers.findIndex((element) => element === settlerName);
    if (settlerIndex > -1) {
      const newSettlers: string[] = [...settlers.slice(0, settlerIndex), ...settlers.slice(settlerIndex + 1)];
      Memory.provinces[provinceName] = {...province, settlers: newSettlers};
    } else {
      Log.warning(`Settler ${settlerName} not found in province ${provinceName} while deleting`);
    }
  }

  static hasSettler(provinceName: string, settlerName: string): boolean {
    const province = Province.get(provinceName);
    const {settlers} = province;
    const settlerIndex: number = settlers.findIndex((element) => element === settlerName);
    return settlerIndex > -1;
  }

  static getSettlersAmount(provinceName: string, settlerRole?: SettlerRole): number {
    const province = Province.get(provinceName);
    const {settlers} = province;

    if (!settlerRole) {
      return settlers.length;
    }

    const filteredSettlersByRole = settlers.filter((settlerName) => {
      const settler = Memory.creeps[settlerName];

      if (!settler) {
        return false;
      }

      const {role} = settler;
      return settlerRole === role;
    });

    return filteredSettlersByRole.length;
  }

  static calculateCreepToSpawn(
    provinceName: string
  ): {body: BodyPartConstant[]; role: SettlerRole} | null {
    const province = Province.get(provinceName);
    const {capitalName} = province;
    const capitalRoom: Room = Game.rooms[capitalName];

    if (!capitalRoom) {
      Log.error(`No room found for capitalName: ${capitalName}`);
      return null;
    }

    // const {energyCapacityAvailable} = capitalRoom;

    // TODO
    return {role: 'PIONEER', body: ['work', 'carry', 'move']};
  }

  static spawnCreep(provinceName: string): void {
    const province = Province.get(provinceName);
    const {garrisons} = province;
    const garrisonName: string = garrisons[0];

    const creepToSpawn = Province.calculateCreepToSpawn(provinceName);

    if (!creepToSpawn) {
      return;
    }

    const {role, body} = creepToSpawn;

    // TODO
    const settlerName = 'P1';

    if (Garrison.canSpawnSettler(garrisonName, body)) {
      const spawnResult: ScreepsReturnCode = Garrison.spawnSettler(provinceName, garrisonName, settlerName, body, role);
      if (spawnResult === OK) {
        Province.addSettler(provinceName, settlerName);
      }
    }
  }

  static getStoredEnergy(): number {
    // TODO get energy amount in capital storage and capital container
    return 0;
  }

  static getStorageEnergy(): number {
    // TODO get energy amount in capital storage
    return 0;
  }

  static run(provinceName: string): void {
    const province = Province.get(provinceName);

    if (!province) {
      Log.error(`No province with name: ${provinceName}`);
      return;
    }

    const {settlers} = province;

    const pioneersAmount: number = Province.getSettlersAmount(provinceName, 'PIONEER');
    if (pioneersAmount === 0) {
      Province.spawnCreep(provinceName);
    }

    // Log.info(`Running province ${provinceName}`);
    // stuff

    settlers.forEach((settlerName) => {
      Settler.run(settlerName);
    });
  }
}
