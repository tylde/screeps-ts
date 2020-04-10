import Log from '../console/Log';
import Link from '../console/Link';

import Settler from '../settler/Settler';

export default class Garrison {
  static hasPlayerGarrisons(): boolean {
    return Object.keys(Game.spawns).length > 0;
  }

  static translateSpawnResult(spawnResult: ScreepsReturnCode): string {
    switch (spawnResult) {
    case 0:
      return 'The operation has been scheduled successfully.';
    case -1:
      return 'You are not the owner of this spawn.';
    case -3:
      return 'There is a creep with the same name already.';
    case -4:
      return 'The spawn is already in process of spawning another creep.';
    case -6:
      return 'The spawn and its extensions contain not enough energy to create a creep with the given body.';
    case -10:
      return 'Body is not properly described or name was not provided.';
    case -14:
      return 'Your Room Controller level is insufficient to use this spawn.';
    default:
      return `UNKNOWN_CODE - ${spawnResult}`;
    }
  }

  static calculateRequiredEnergy(body: BodyPartConstant[]): number {
    let requiredEnergy = 0;

    body.forEach((bodyPart: BodyPartConstant) => {
      if (bodyPart === 'move') {
        requiredEnergy += 50;
      } else if (bodyPart === 'work') {
        requiredEnergy += 100;
      } else if (bodyPart === 'carry') {
        requiredEnergy += 50;
      } else if (bodyPart === 'attack') {
        requiredEnergy += 80;
      } else if (bodyPart === 'ranged_attack') {
        requiredEnergy += 150;
      } else if (bodyPart === 'heal') {
        requiredEnergy += 250;
      } else if (bodyPart === 'claim') {
        requiredEnergy += 600;
      } else if (bodyPart === 'tough') {
        requiredEnergy += 10;
      }
    });

    return requiredEnergy;
}

  static canSpawnSettler(garrisonName: string, body: BodyPartConstant[]): boolean {
    const garrisonRoom: Room = Game.spawns[garrisonName].room;
    const requiredEnergy = Garrison.calculateRequiredEnergy(body);
    const {energyAvailable} = garrisonRoom;
    return requiredEnergy <= energyAvailable;
  }

  static spawnSettler(
    provinceName: string, garrisonName: string, settlerName: string, body: BodyPartConstant[], role: SettlerRole
  ): ScreepsReturnCode {
    const garrison = Game.spawns[garrisonName];
    const settler = new Settler(settlerName, role, provinceName);
    const spawnResult: ScreepsReturnCode = garrison.spawnCreep(body, settlerName, {memory: settler});

    if (spawnResult === OK) {
      Log.info(`${Link.toCapital(provinceName)} Spawning settler ${settlerName} (${role})`);
    } else {
      const message = Garrison.translateSpawnResult(spawnResult);
      Log.error(
        `${Link.toCapital(provinceName)} Cannot spawn settler with role: ${role} - ${message}`
      );
    }

    return spawnResult;
  }
}
