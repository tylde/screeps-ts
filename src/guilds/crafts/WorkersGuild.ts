import Link from '../../console/Link';
import Log from '../../console/Log';

import TaskBuildStructure from '../../task/types/TaskBuildStructure';

import ProvinceHandler from '../../province/ProvinceHandler';
import TaskHandler from '../../task/TaskHandler';
import Capital from '../../province/Capital';

export default class WorkersGuild {
  static createConstructionSite(
    provinceName: string, districtName: string, x: number, y: number, structureType: BuildableStructureConstant
  ): void {
    const province = ProvinceHandler.get(provinceName);
    const roomPosition = new RoomPosition(x, y, districtName);

    if (!province || !roomPosition) {
      Log.debug(`${Link.toRoom(districtName)}[${x}, ${y}] Cannot create construction site`);
      return;
    }

    const result = roomPosition.createConstructionSite(structureType);
    if (result === OK) {
      const constructions = roomPosition.lookFor(LOOK_CONSTRUCTION_SITES);
      const createdConstruction = constructions.find(construction => construction.structureType === structureType);

      if (createdConstruction) {
        const {id: constructionId} = createdConstruction;
        const constructionPosition: ElementPosition = {x, y, roomName: districtName};
        const task = new TaskBuildStructure(provinceName, constructionId, constructionPosition);
        const {id: taskId} = task;

        TaskHandler.add(taskId, task);
        ProvinceHandler.addTask(provinceName, taskId);
      }
    }
  }

  static reassignCraftsTasks(): void {

  }

  static manageTasks(provinceName: string): void {
    const province = ProvinceHandler.get(provinceName);
  }

  static calculateRequiredWorkers(provinceName: string): number {
    // calculate from spawn energyCapacity => WORK power
    // from overal needed energy to build structures
    // and minimum for upgrading

    // const {capitalName} = ProvinceHandler.get(provinceName);
    // const spawnEnergyCapacity = Capital.getSpawnEnergyCapacity(capitalName);
    const minimalWorkerToUpgrade = 3;
    return minimalWorkerToUpgrade;
  }
}
