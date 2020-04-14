import Log from '../console/Log';

import SettlerUtils from '../settler/utils/SettlerUtils';

export default class Capital {
  static getCapitalRoom(capitalName: string): Room | undefined {
    return Game.rooms[capitalName];
  }

  static getSpawnEnergyCapacity(capitalName: string): number {
    const capitalRoom = Game.rooms[capitalName];
    if (!capitalRoom) {
      Log.debug(`Cannot find capitalRoom for capitalName: ${capitalName}`);
      return 0;
    }
    return capitalRoom.energyCapacityAvailable;
  }

  static canSpawnSettler(capitalRoom: Room, settlerBody: BodyPartConstant[]): boolean {
    const {energyAvailable} = capitalRoom;
    const requiredEnergy = SettlerUtils.calculateRequiredEnergy(settlerBody);
    return requiredEnergy <= energyAvailable;
  }
}
