import Log from '../console/Log';

import ArrayHelper from '../helpers/ArrayHelper';

import Garrison from '../garrison/garrison';
import Province from '../province/province';
import District from '../district/District';
import Settler from '../settler/Settler';
import {DISTRICT_CAPITAL} from '../district/config/DistrictConstants';

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
      const newProvinces: string[] = ArrayHelper.removeElementFromIndex(provinces, provinceIndex);
      Memory.realm = {...realm, provinces: newProvinces};
    } else {
      Log.debug(`Province ${provinceName} not found in realm while deleting`);
    }
  }

  static prepare(): void {
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
    Province.initProvinces();
    Object.entries(Game.spawns).forEach(([garrisonName, spawn], index) => {
      const provinceName = `Province ${index + 1}`;
      const province = new Province(provinceName, spawn);
      const districtName = spawn.room.name;

      const district: District = new District(districtName, provinceName, DISTRICT_CAPITAL);
      const garrison: Garrison = new Garrison(provinceName);

      Realm.addProvince(provinceName);
      Province.addToMemory(provinceName, province);
      District.addToMemory(districtName, district);
      Garrison.addToMemory(garrisonName, garrison);
    });
    Log.success(`Initialized provinces: ${Object.keys(Memory.provinces).length}`);
  }

  static initializeDistricts(): void {
    if (!Memory.rooms) {
      District.initDistricts();
    }
  }

  static initializeSettlers(): void {
    if (!Memory.creeps) {
      Settler.initSettlers();
    }
  }

  static run(): void {
    const realm: Realm = Realm.get();
    if (!realm) {
      return;
    }
    realm.provinces.forEach((provinceName) => {
      Province.run(provinceName);
    });
  }
}
