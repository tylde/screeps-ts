import MineHandler from '../../resources/MineHandler';
import Utils from '../../utils/utils';

export default class SettlerCommands {
  // static moveToRoom(creep: Creep, roomName: string) {
  //   //
  // }

  static moveToPosition(creep: Creep, positionX: number, positionY: number): ScreepsReturnCode {
    if (creep.fatigue === 0) {
      return creep.moveTo(positionX, positionY, {visualizePathStyle: {}});
    }
    return ERR_TIRED;
  }

  static moveRandomly(creep: Creep): ScreepsReturnCode {
    const direction: DirectionConstant = Utils.getRandomInt(1, 8) as DirectionConstant;
    return creep.move(direction);
  }

  static mine(creep: Creep, mineId: string): ScreepsReturnCode {
    const source: Source | null = Game.getObjectById(mineId);
    if (source) {
      return SettlerCommands.mineSource(creep, source);
    }
    return ERR_INVALID_TARGET;
  }

  static mineSource(creep: Creep, source: Source): ScreepsReturnCode {
    const result = creep.harvest(source);
    if (result === OK) {
      const minedEnergy = 2 * creep.getActiveBodyparts(WORK);
      MineHandler.updateCurrentCycleEnergy(source.id, minedEnergy);
    }
    return result;
  }

  static upgradeController(creep: Creep, controller: StructureController): ScreepsReturnCode {
    return creep.upgradeController(controller);
  }

  // static transportEnergy(creep: Creep): void {
  //
  // }

  // static moveToRoomPosition(
  //   creep: Creep, position: ElementPosition
  // ): CreepMoveReturnCode | ERR_NO_PATH | ERR_INVALID_TARGET | ERR_NOT_FOUND {
  //   const {roomName, x, y} = position;
  //   const target = new RoomPosition(x, y, roomName);
  //   const options: MoveToOpts = {visualizePathStyle: {}};
  //   return creep.moveTo(target, options);
  // }
}
