export default class SettlerCommands {
  // static moveToRoom(creep: Creep, roomName: string) {
  //   //
  // }

  static moveToPosition(creep: Creep, positionX: number, positionY: number) {
    if (creep.fatigue === 0) {
      creep.moveTo(positionX, positionY, {visualizePathStyle: {}});
    }
  }

  static mine(creep: Creep, mineId: string): void {
    const source: Source | null = Game.getObjectById(mineId);
    if (source) {
      creep.harvest(source);
    }
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
