import Log from '../console/Log';

import District from '../district/District';
import Mine from '../resources/Mine';
import Province from '../province/Province';
import Quarry from '../resources/Quarry';
import Settler from '../settler/Settler';

class GarbageCollector {
  static cleanDistricts(): void {
    if (!Memory.rooms) {
      return;
    }
    Object.keys(Memory.rooms).forEach((districtName) => {
      if (!(districtName in Game.creeps)) {
        const district: District = Memory.rooms[districtName];
        const districtPronince: string = district.provinceName;
        Province.deleteDistrict(districtPronince, districtName);
        District.deleteFromMemory(districtName);
      }
    });
  }

  static cleanSettlers(): void {
    if (!Memory.creeps) {
      return;
    }
    Object.keys(Memory.creeps).forEach((settlerName) => {
      if (!(settlerName in Game.creeps)) {
        const settler: Settler = Memory.creeps[settlerName];
        const settlerProvince: string = settler.provinceName;
        Province.deleteSettler(settlerProvince, settlerName);
        Settler.deleteFromMemory(settlerName);
      }
    });
  }

  static clean(): void {
    this.cleanDistricts();
    this.cleanSettlers();
  }

  static cleanMemoryAfterDefeat(): void {
    if (Object.keys(Game.creeps).length > 0 || Object.keys(Game.spawns).length > 0) {
      return;
    }

    if (
      Object.keys(Memory.provinces).length === 0
      && Object.keys(Memory.rooms).length === 0
      && Object.keys(Memory.creeps).length === 0
      && Object.keys(Memory.mines).length === 0
      && Object.keys(Memory.quarries).length === 0
    ) {
      return;
    }

    Log.info('Cleaning memory after defeat');
    GarbageCollector.delete();
  }

  static delete(): void {
    delete Memory.realm;

    Province.initProvinces();
    District.initDistricts();
    Settler.initSettlers();

    Mine.initMines();
    Quarry.initQuarries();
  }
}

export default GarbageCollector;
