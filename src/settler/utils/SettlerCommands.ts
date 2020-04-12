export default class SettlerCommands {
  // static moveToRoom(creep: Creep, roomName: string) {
  //   //
  // }
  //
  // static mine(creep: Creep, sourceId: string) {
  //   //
  // }
  //
  // static transportEnergy(creep: Creep): void {
  //
  // }

  static moveToRoomPosition(
    creep: Creep, position: ElementPosition
  ): CreepMoveReturnCode | ERR_NO_PATH | ERR_INVALID_TARGET | ERR_NOT_FOUND {
    const {roomName, x, y} = position;
    const target = new RoomPosition(x, y, roomName);
    const options: MoveToOpts = {visualizePathStyle: {}};
    return creep.moveTo(target, options);
  }
}
