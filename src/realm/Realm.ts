import ArrayHelper from '../helpers/ArrayHelper';
import Log from '../console/Log';

import District from '../district/District';
import Garrison from '../garrison/garrison';
import Province from '../province/province';

import DistrictHandler from '../district/DistrictHandler';
import GarrisonHandler from '../garrison/GarrisonHandler';
import ProvinceHandler from '../province/ProvinceHandler';
import SettlerHandler from '../settler/SettlerHandler';

export default class Realm implements RealmMemory {
  provincesNames: string[];
  initializationTick: number;

  constructor() {
    this.provincesNames = [];
    this.initializationTick = Game.time;
  }

  static get(): Realm {
    return Memory.realm;
  }

  static addProvince(provinceName: string): void {
    const realm: Realm = Realm.get();
    const {provincesNames} = realm;
    const newProvinces: string[] = [...provincesNames, provinceName];
    Memory.realm = {...realm, provincesNames: newProvinces};
  }

  static deleteProvince(provinceName: string): void {
    const realm: Realm = Realm.get();
    const {provincesNames} = realm;

    const provinceIndex: number = provincesNames.findIndex((element) => element === provinceName);
    if (provinceIndex > -1) {
      const newProvinces: string[] = ArrayHelper.removeElementFromIndex(provincesNames, provinceIndex);
      Memory.realm = {...realm, provincesNames: newProvinces};
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
    ProvinceHandler.init();
    Object.entries(Game.spawns).forEach(([garrisonName, spawn]) => {
      const provinceName = spawn.room.name;
      const province = new Province(provinceName, spawn);
      const districtName = spawn.room.name;

      const district: District = new District(districtName, provinceName, 'DISTRICT_CAPITAL');
      const garrison: Garrison = new Garrison(provinceName);

      Realm.addProvince(provinceName);
      ProvinceHandler.add(provinceName, province);
      DistrictHandler.add(districtName, district);
      GarrisonHandler.add(garrisonName, garrison);
    });
    Log.success(`Initialized provinces: ${Object.keys(Memory.provinces).length}`);
  }

  static initializeDistricts(): void {
    if (!Memory.rooms) {
      DistrictHandler.init();
    }
  }

  static initializeSettlers(): void {
    if (!Memory.creeps) {
      SettlerHandler.init();
    }
  }

  static run(): void {
    const realm: Realm = Realm.get();
    if (!realm) {
      return;
    }
    realm.provincesNames.forEach((provinceName) => {
      Province.run(provinceName);
    });
  }
}
