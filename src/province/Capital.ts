import SettlerUtils from '../settler/utils/SettlerUtils';

export default class Capital {
  static getCapitalRoom(capitalName: string): Room | undefined {
    return Game.rooms[capitalName];
  }

  static canSpawnSettler(capitalRoom: Room, settlerBody: BodyPartConstant[]): boolean {
    const {energyAvailable} = capitalRoom;
    const requiredEnergy = SettlerUtils.calculateRequiredEnergy(settlerBody);
    return requiredEnergy <= energyAvailable;
  }
}
