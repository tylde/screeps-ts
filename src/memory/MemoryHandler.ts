import Province from '../province/Province';
import Settler from '../settler/Settler';
import District from '../district/District';
import Log from '../console/Log';

class MemoryHandler {
  static initProvinces(): void {
    Memory.provinces = {};
  }

  static addProvince(provinceName: string, province: Province): void {
    Memory.provinces = {...Memory.provinces, [provinceName]: province};
  }

  static deleteProvince(provinceName: string): void {
    delete Memory.provinces[provinceName];
  }

  static initDistricts(): void {
    Memory.districts = {};
  }

  static addDistrict(districtName: string, district: District): void {
    Memory.districts = {...Memory.districts, [districtName]: district};
  }

  static deleteDistrict(districtName: string): void {
    delete Memory.districts[districtName];
  }

  static initSettlers(): void {
    Memory.settlers = {};
  }

  static addSettler(settlerName: string, settler: Settler): void {
    Memory.settlers = {...Memory.settlers, [settlerName]: settler};
  }

  static deleteSettler(settlerName: string): void {
    delete Memory.settlers[settlerName];
  }

  static cleanDistricts(): void {
    if (!Memory.districts) {
      return;
    }
    Object.keys(Memory.districts).forEach((districtName) => {
      if (!(districtName in Game.creeps)) {
        const district: District = Memory.districts[districtName];
        const districtPronince: string = district.provinceName;
        Province.deleteDistrict(districtPronince, districtName);
        MemoryHandler.deleteDistrict(districtName);
      }
    });
  }

  static cleanSettlers(): void {
    if (!Memory.settlers) {
      return;
    }
    Object.keys(Memory.settlers).forEach((settlerName) => {
      if (!(settlerName in Game.creeps)) {
        const settler: Settler = Memory.settlers[settlerName];
        const settlerProvince: string = settler.provinceName;
        Province.deleteSettler(settlerProvince, settlerName);
        MemoryHandler.deleteSettler(settlerName);
      }
    });
  }

  static clean(): void {
    this.cleanDistricts();
    this.cleanSettlers();
  }

  static delete(): void {
    Log.warning('Deleting memory.');
    if (Memory.realm) {
      delete Memory.realm;
    }
    if (Memory.provinces) {
      delete Memory.realm;
    }
    // if (Memory.districts) {
    //   delete Memory.realm;
    // }
    // if (Memory.settlers) {
    //   delete Memory.realm;
    // }
    if (Memory.settings) {
      delete Memory.realm;
    }
  }
}

export default MemoryHandler;
