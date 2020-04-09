import Garrison from '../garrison/garrison';
import Province from '../province/province';
import Log from '../console/Log';
import MemoryHandler from '../memory/MemoryHandler';

export default class Realm {
  provinces: string[];
  initializationTick: number;

  constructor() {
    this.provinces = [];
    this.initializationTick = Game.time;
  }

  static get(): Realm {
    return Memory.realm;
  }

  static addProvince(provinceName: string): void {
    const realm: Realm = Realm.get();
    const {provinces} = realm;
    const newProvinces: string[] = [...provinces, provinceName];
    Memory.realm = {...realm, provinces: newProvinces};
  }

  static deleteProvince(provinceName: string): void {
    const realm: Realm = Realm.get();
    const {provinces} = realm;

    const provinceIndex: number = provinces.findIndex((element) => element === provinceName);
    if (provinceIndex > -1) {
      const newProvinces: string[] = [...provinces.slice(0, provinceIndex), ...provinces.slice(provinceIndex + 1)];
      Memory.realm = {...realm, provinces: newProvinces};
    } else {
      Log.warning(`Province ${provinceName} not found in realm while deleting`);
    }
  }

  static init(): void {
    if (Memory.realm) {
      return;
    }

    if (!Garrison.hasPlayerGarrisons()) {
      Log.warning('Place garrison to start.');
      return;
    }

    Log.info('Initializing realm...');

    Memory.realm = new Realm();

    this.initializeDistricts();
    this.initializeSettlers();
    this.initializeProvinces();
  }

  static initializeProvinces(): void {
    MemoryHandler.initProvinces();
    Object.entries(Game.spawns).forEach(([, garrison], index) => {
      const provinceName = `Province ${index + 1}`;
      const province = new Province(provinceName, garrison);

      Realm.addProvince(provinceName);
      MemoryHandler.addProvince(provinceName, province);

      if (Memory.districts) {
        Object.entries(Memory.districts).forEach(([districtName, district]) => {
          const {provinceName: districtProvinceName} = district;
          if (provinceName === districtProvinceName) {
            Province.addDistrict(provinceName, districtName);
          }
        });
      }

      if (Memory.settlers) {
        Object.entries(Memory.settlers).forEach(([settlerName, settler]) => {
          const {provinceName: settlerProvinceName} = settler;
          if (provinceName === settlerProvinceName) {
            Province.addSettler(provinceName, settlerName);
          }
        });
      }

      Log.success(`Initialized provinces: ${Object.keys(Memory.provinces).length}`);
    });
  }

  static initializeDistricts(): void {
    if (!Memory.districts) {
      MemoryHandler.initDistricts();
    }
  }

  static initializeSettlers(): void {
    if (!Memory.settlers) {
      MemoryHandler.initSettlers();
    }
  }

  static run(): void {
    const realm: Realm = Realm.get();
    realm.provinces.forEach((provinceName) => {
      Province.run(provinceName);
    });
  }
}
