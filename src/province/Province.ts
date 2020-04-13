import Log from '../console/Log';

import SettlerPatterns from '../settler/config/SettlerPatterns';

import Capital from './Capital';
import Garrison from '../garrison/Garrison';
import Settler from '../settler/Settler';

import MinersGuild from '../guilds/minig/MinersGuild';
import PioneersGuild from '../guilds/minig/PioneersGuild';

import ProvinceHandler from './ProvinceHandler';
import SettlerHandler from '../settler/SettlerHandler';
import TaskHandler from '../task/TaskHandler';

export default class Province implements ProvinceMemory {
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

    const room: Room = garrison.room;
    const sources: Source[] = room.find(FIND_SOURCES);
    const minerals: Mineral[] = room.find(FIND_MINERALS);

    const minesIds: string[] = sources.map((source: Source) => source.id);
    const quarryIds: string[] = minerals.map((mineral: Mineral) => mineral.id);

    this.minesIds = minesIds;
    this.quarriesIds = quarryIds;

    this.directivesIds = [];
    this.tasksIds = [];
  }

  // ===================================================================================================================

  static manageTasks(provinceName: string): void {
    PioneersGuild.manageTasks(provinceName);
    MinersGuild.manageTasks(provinceName);
  }

  static assignTasks(provinceName: string): void {
    const province = ProvinceHandler.get(provinceName);
    const {settlersNames, tasksIds} = province;

    const unassignedTasks = tasksIds.map(taskId => TaskHandler.get(taskId))
      .filter(task => task.assignedSettlerName === null);

    // TODO CHECK
    unassignedTasks.sort((a, b) => a.priority > b.priority ? 1 : -1);

    unassignedTasks.forEach((task) => {
      const {assignableSettlers, id: taskId} = task;
      const unassignedSettlers = settlersNames.map(settlerName => SettlerHandler.get(settlerName))
        .filter(settler => settler.assignedTaskId === null)
        .filter(settler => assignableSettlers.includes(settler.role));

      const settlerToAssign = unassignedSettlers[0];
      if (settlerToAssign) {
        const {name: settlerName} = settlerToAssign;
        SettlerHandler.assignTask(settlerName, taskId);
        TaskHandler.assignSettler(taskId, settlerName);
      }
    });
  }

  static calculateCreepsToSpawn(
    provinceName: string
  ): {body: BodyPartConstant[]; role: SettlerRole}[] {
    const province = ProvinceHandler.get(provinceName);
    const {capitalName, tasksIds} = province;
    const capitalRoom: Room = Game.rooms[capitalName];

    if (!capitalRoom) {
      Log.debug(`No room found for capitalName: ${capitalName}`);
      return [];
    }

    const unassignedTasks = tasksIds.map((taskId) => TaskHandler.get(taskId))
      .filter(task => task.assignedSettlerName === null);

    if (unassignedTasks.length === 0) {
      return [];
    }

    // TODO MAKE METHOD
    unassignedTasks.sort((a, b) => a.priority > b.priority ? 1 : -1);

    const unassignedTask = unassignedTasks[0];
    const {assignableSettlers, type} = unassignedTask;

    if (assignableSettlers.length === 0) {
      Log.debug(`Task type: ${type} has not any assignableSettlers`);
      return [];
    }

    const settlerRole = assignableSettlers[0];

    const settlerBody = SettlerPatterns.calculateBodyToSpawn(settlerRole);

    return [{role: settlerRole, body: settlerBody}];
  }

  static spawnCreep(provinceName: string): void {
    const province = ProvinceHandler.get(provinceName);
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
          ProvinceHandler.addSettler(provinceName, settlerName);
          creepsToSpawn.shift();
        }
      }
    });
  }

  static manageSpawn(provinceName: string): void {
    // const province = ProvinceHandler.get(provinceName);

    Province.spawnCreep(provinceName);
  }

  static manageSettlers(provinceName: string): void {
    const province = ProvinceHandler.get(provinceName);
    const {settlersNames} = province;
    settlersNames.forEach((settlerName) => {
      Settler.run(settlerName);
    });
  }

  static run(provinceName: string): void {
    const province = ProvinceHandler.get(provinceName);

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
