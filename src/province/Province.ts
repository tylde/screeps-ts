import Log from '../console/Log';

import ArrayHelper from '../helpers/ArrayHelper';

import Garrison from '../garrison/Garrison';
import Settler from '../settler/Settler';
import Capital from './Capital';
import Task from '../task/Task';
import TaskUtils from '../task/utils/TaskUtils';

import TaskBootstrapProvince from '../task/types/TaskBootstrapProvince';
import DistrictUtils from '../district/utils/DistrictUtils';

export default class Province {
  name: string;
  capitalName: string;
  garrisonsNames: string[];
  districtsNames: string[];
  settlersNames: string[];

  minesIds: string[];
  quarriesIds: string[];

  directivesIds: string[];
  tasksIds: string[];

  constructor(name: string, garrison: StructureSpawn) {
    this.name = name;
    this.capitalName = garrison.room.name;
    this.garrisonsNames = [garrison.name];
    this.districtsNames = [garrison.room.name];
    this.settlersNames = [];

    this.minesIds = [];
    this.quarriesIds = [];

    this.directivesIds = [];
    this.tasksIds = [];
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
    const {districtsNames} = province;
    const newDistricts: string[] = [...districtsNames, districtName];
    Province.updateInMemory(provinceName, {...province, districtsNames: newDistricts});
  }

  static deleteDistrict(provinceName: string, districtName: string): void {
    const province = Province.get(provinceName);
    const {districtsNames} = province;

    const districtIndex: number = districtsNames.findIndex((element) => element === districtName);
    if (districtIndex > -1) {
      const newDistricts: string[] = ArrayHelper.removeElementFromIndex(districtsNames, districtIndex);
      Province.updateInMemory(provinceName, {...province, districtsNames: newDistricts});
    } else {
      Log.debug(`District ${districtName} not found in province ${provinceName} while deleting`);
    }
  }

  static hasDistrict(provinceName: string, districtName: string): boolean {
    const province = Province.get(provinceName);
    const {districtsNames} = province;
    const districtIndex: number = districtsNames.findIndex((element) => element === districtName);
    return districtIndex > -1;
  }

  static getDistrictsAmount(provinceName: string): number {
    const province = Province.get(provinceName);
    const {districtsNames} = province;
    return districtsNames.length;
  }

  static addGarrison(provinceName: string, garrisonName: string): void {
    const province = Province.get(provinceName);
    const {garrisonsNames} = province;
    const newGarrisons: string[] = [...garrisonsNames, garrisonName];
    Province.updateInMemory(provinceName, {...province, garrisonsNames: newGarrisons});
  }

  static deleteGarrison(provinceName: string, garrisonName: string): void {
    const province = Province.get(provinceName);
    const {garrisonsNames} = province;

    const garrisonIndex: number = garrisonsNames.findIndex((element) => element === garrisonName);
    if (garrisonIndex > -1) {
      const newGarrisons: string[] = ArrayHelper.removeElementFromIndex(garrisonsNames, garrisonIndex);
      Province.updateInMemory(provinceName, {...province, garrisonsNames: newGarrisons});
    } else {
      Log.debug(`Garrison ${garrisonName} not found in province ${provinceName} while deleting`);
    }
  }

  static hasGarrison(provinceName: string, garrisonName: string): boolean {
    const province = Province.get(provinceName);
    const {garrisonsNames} = province;
    const garrisonIndex: number = garrisonsNames.findIndex((element) => element === garrisonName);
    return garrisonIndex > -1;
  }

  static getGarrisonsAmount(provinceName: string): number {
    const province = Province.get(provinceName);
    const {garrisonsNames} = province;
    return garrisonsNames.length;
  }

  static addSettler(provinceName: string, settlerName: string): void {
    const province = Province.get(provinceName);
    const {settlersNames} = province;
    const newSettlers: string[] = [...settlersNames, settlerName];
    Province.updateInMemory(provinceName, {...province, settlersNames: newSettlers});
  }

  static deleteSettler(provinceName: string, settlerName: string): void {
    const province = Province.get(provinceName);

    if (!province) {
      Log.debug(`No province found for provinceName: ${provinceName} and settlerName: ${settlerName}`);
      return;
    }

    const {settlersNames} = province;

    const settlerIndex: number = settlersNames.findIndex((element) => element === settlerName);
    if (settlerIndex > -1) {
      const newSettlers: string[] = ArrayHelper.removeElementFromIndex(settlersNames, settlerIndex);
      Province.updateInMemory(provinceName, {...province, settlersNames: newSettlers});
    } else {
      Log.debug(`Settler ${settlerName} not found in province ${provinceName} while deleting`);
    }
  }

  static hasSettler(provinceName: string, settlerName: string): boolean {
    const province = Province.get(provinceName);
    const {settlersNames} = province;
    const settlerIndex: number = settlersNames.findIndex((element) => element === settlerName);
    return settlerIndex > -1;
  }

  static getSettlersAmount(provinceName: string, settlerRole?: SettlerRole): number {
    const province = Province.get(provinceName);
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

  static addTask(provinceName: string, taskName: string): void {
    const province = Province.get(provinceName);
    const {tasksIds} = province;
    const newTasks: string[] = [...tasksIds, taskName];
    Province.updateInMemory(provinceName, {...province, tasksIds: newTasks});
  }

  static deleteTask(provinceName: string, taskName: string): void {
    const province = Province.get(provinceName);
    const {tasksIds} = province;

    const taskIndex: number = tasksIds.findIndex((element) => element === taskName);
    if (taskIndex > -1) {
      const newTasks: string[] = ArrayHelper.removeElementFromIndex(tasksIds, taskIndex);
      Province.updateInMemory(provinceName, {...province, tasksIds: newTasks});
    } else {
      Log.debug(`Task ${taskName} not found in province ${provinceName} while deleting`);
    }
  }

  static calculateNeededMiners(): number {
    return 0;
  }

  static manageBootstrapingTasks(provinceName: string): void {
    const province = Province.get(provinceName);
    const {capitalName, tasksIds} = province;
    const capitalRoom = Capital.getCapitalRoom(capitalName);
    if (!capitalRoom) {
      Log.debug(`[${provinceName}] Cannot find capitalRoom for capitalName: ${capitalName}`);
      return;
    }
    const controller = capitalRoom.controller;
    if (!controller) {
      Log.debug(`[${provinceName}] Cannot find controller for capitalName: ${capitalName}`);
      return;
    }

    const minersAmount = Province.getSettlersAmount(provinceName, 'SETTLER_MINER');
    const carriersAmount = Province.getSettlersAmount(provinceName, 'SETTLER_CARRIER');
    const storedEnergyInCapital = DistrictUtils.getStorageEnergy(capitalRoom);

    const {level: controllerLevel} = controller;
    let requiredTasks = 0;
    if (controllerLevel < 3 || (minersAmount === 0 && carriersAmount === 0) || storedEnergyInCapital < 1000) {
      requiredTasks = 2;
    }

    const currentTasks: Task[] = tasksIds
      .map((taskId) => Task.get(taskId))
      .filter(task => TaskUtils.isType(task, 'TASK_BOOTSTRAP_PROVINCE'));

    for (let i = currentTasks.length; i < requiredTasks; i++) {
      const task = new TaskBootstrapProvince(provinceName);
      const taskId = task.id;

      Task.addToMemory(taskId, task);
      Province.addTask(provinceName, taskId);
    }
  }


  static manageTasks(provinceName: string): void {
    Province.manageBootstrapingTasks(provinceName);
  }

  static assignTasks(provinceName: string): void {
    const province = Province.get(provinceName);
    const {settlersNames, tasksIds} = province;

    const unassignedTasks = tasksIds.map(taskId => Task.get(taskId))
      .filter(task => task.assignedSettlerName === null);

    // TODO CHECK
    unassignedTasks.sort((a, b) => a.priority < b.priority ? 1 : -1);

    unassignedTasks.forEach((task) => {
      const {assignableSettlers, id: taskId} = task;
      const unassignedSettlers = settlersNames.map(settlerName => Settler.get(settlerName))
        .filter(settler => settler.assignedTaskId === null)
        .filter(settler => assignableSettlers.includes(settler.role));

      const settlerToAssign = unassignedSettlers[0];
      if (settlerToAssign) {
        const {name: settlerName} = settlerToAssign;
        Settler.assignTask(settlerName, taskId);
        Task.assignSettler(taskId, settlerName);
      }
    });
  }

  static calculateCreepsToSpawn(
    provinceName: string
  ): {body: BodyPartConstant[]; role: SettlerRole}[] {
    const province = Province.get(provinceName);
    const {capitalName} = province;
    const capitalRoom: Room = Game.rooms[capitalName];

    if (!capitalRoom) {
      Log.debug(`No room found for capitalName: ${capitalName}`);
      return [];
    }

    // TODO
    return [{role: 'SETTLER_PIONEER', body: [WORK, CARRY, MOVE]}];
  }

  static spawnCreep(provinceName: string): void {
    const province = Province.get(provinceName);
    const {garrisonsNames, capitalName} = province;

    const capitalRoom: Room = Game.rooms[capitalName];

    const creepsToSpawn = Province.calculateCreepsToSpawn(provinceName);

    if (creepsToSpawn.length === 0) {
      return;
    }

    const [{role, body}] = creepsToSpawn;

    // TODO
    garrisonsNames.forEach((garrisonName) => {
      if (Capital.canSpawnSettler(capitalRoom, body)) {
        const settlerName = Garrison.calculateSettlerName(role);
        const spawnResult: ScreepsReturnCode = Garrison
          .spawnSettler(provinceName, garrisonName, settlerName, body, role);
        if (spawnResult === OK) {
          Province.addSettler(provinceName, settlerName);
          creepsToSpawn.shift();
        }
      }
    });
  }

  static manageSpawn(provinceName: string): void {
    // const province = Province.get(provinceName);

    const pioneersAmount: number = Province.getSettlersAmount(provinceName, 'SETTLER_PIONEER');
    if (pioneersAmount < 2) {
      Province.spawnCreep(provinceName);
    }
  }

  static manageSettlers(provinceName: string): void {
    const province = Province.get(provinceName);
    const {settlersNames} = province;
    settlersNames.forEach((settlerName) => {
      Settler.run(settlerName);
    });
  }

  static run(provinceName: string): void {
    const province = Province.get(provinceName);

    if (!province) {
      Log.error(`No province found with name: ${provinceName}`);
      return;
    }


    Province.manageTasks(provinceName);
    Province.assignTasks(provinceName);
    Province.manageSpawn(provinceName);
    Province.manageSettlers(provinceName);
  }
}
