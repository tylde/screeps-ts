import ArrayHelper from '../helpers/ArrayHelper';
import Log from '../console/Log';

export default class ProvinceHandler {
  static get(provinceName: string): ProvinceMemory {
    return Memory.provinces[provinceName];
  }

  static init(): void {
    Memory.provinces = {};
  }

  static add(provinceName: string, province: ProvinceMemory): void {
    Memory.provinces = {...Memory.provinces, [provinceName]: province};
  }

  static update(provinceName: string, province: ProvinceMemory): void {
    Memory.provinces[provinceName] = province;
  }

  static delete(provinceName: string): void {
    delete Memory.provinces[provinceName];
  }

  // ===================================================================================================================

  static addDistrict(provinceName: string, districtName: string): void {
    const province = ProvinceHandler.get(provinceName);
    const {districtsNames} = province;
    const newDistricts: string[] = [...districtsNames, districtName];
    ProvinceHandler.update(provinceName, {...province, districtsNames: newDistricts});
  }

  static deleteDistrict(provinceName: string, districtName: string): void {
    const province = ProvinceHandler.get(provinceName);
    const {districtsNames} = province;

    const districtIndex: number = districtsNames.findIndex((element) => element === districtName);
    if (districtIndex > -1) {
      const newDistricts: string[] = ArrayHelper.removeElementFromIndex(districtsNames, districtIndex);
      ProvinceHandler.update(provinceName, {...province, districtsNames: newDistricts});
    } else {
      Log.debug(`District ${districtName} not found in province ${provinceName} while deleting`);
    }
  }

  static addGarrison(provinceName: string, garrisonName: string): void {
    const province = ProvinceHandler.get(provinceName);
    const {garrisonsNames} = province;
    const newGarrisons: string[] = [...garrisonsNames, garrisonName];
    ProvinceHandler.update(provinceName, {...province, garrisonsNames: newGarrisons});
  }

  static deleteGarrison(provinceName: string, garrisonName: string): void {
    const province = ProvinceHandler.get(provinceName);
    const {garrisonsNames} = province;

    const garrisonIndex: number = garrisonsNames.findIndex((element) => element === garrisonName);
    if (garrisonIndex > -1) {
      const newGarrisons: string[] = ArrayHelper.removeElementFromIndex(garrisonsNames, garrisonIndex);
      ProvinceHandler.update(provinceName, {...province, garrisonsNames: newGarrisons});
    } else {
      Log.debug(`Garrison ${garrisonName} not found in province ${provinceName} while deleting`);
    }
  }

  static addSettler(provinceName: string, settlerName: string): void {
    const province = ProvinceHandler.get(provinceName);
    const {settlersNames} = province;
    const newSettlers: string[] = [...settlersNames, settlerName];
    ProvinceHandler.update(provinceName, {...province, settlersNames: newSettlers});
  }

  static deleteSettler(provinceName: string, settlerName: string): void {
    const province = ProvinceHandler.get(provinceName);

    if (!province) {
      Log.debug(`No province found for provinceName: ${provinceName} and settlerName: ${settlerName}`);
      return;
    }

    const {settlersNames} = province;

    const settlerIndex: number = settlersNames.findIndex((element) => element === settlerName);
    if (settlerIndex > -1) {
      const newSettlers: string[] = ArrayHelper.removeElementFromIndex(settlersNames, settlerIndex);
      ProvinceHandler.update(provinceName, {...province, settlersNames: newSettlers});
    } else {
      Log.debug(`Settler ${settlerName} not found in province ${provinceName} while deleting`);
    }
  }

  static addTask(provinceName: string, taskName: string): void {
    const province = ProvinceHandler.get(provinceName);
    const {tasksIds} = province;
    const newTasks: string[] = [...tasksIds, taskName];
    ProvinceHandler.update(provinceName, {...province, tasksIds: newTasks});
  }

  static deleteTask(provinceName: string, taskName: string): void {
    const province = ProvinceHandler.get(provinceName);
    const {tasksIds} = province;

    const taskIndex: number = tasksIds.findIndex((element) => element === taskName);
    if (taskIndex > -1) {
      const newTasks: string[] = ArrayHelper.removeElementFromIndex(tasksIds, taskIndex);
      ProvinceHandler.update(provinceName, {...province, tasksIds: newTasks});
    } else {
      Log.debug(`Task ${taskName} not found in province ${provinceName} while deleting`);
    }
  }

  // ===================================================================================================================

  static getSettlersAmount(provinceName: string, settlerRole?: SettlerRole): number {
    const province = ProvinceHandler.get(provinceName);
    const {settlersNames} = province;

    if (!settlerRole) {
      return settlersNames.length;
    }

    const filteredSettlersByRole = settlersNames.filter((settlerName) => {
      const settler = Memory.creeps[settlerName];

      if (!settler) {
        return false;
      }

      const {role} = settler;
      return settlerRole === role;
    });

    return filteredSettlersByRole.length;
  }
}
