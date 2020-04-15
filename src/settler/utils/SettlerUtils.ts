export default class SettlerUtils {
  static isAttacked(creep: Creep): boolean {
    return creep.hits < creep.memory.lastHitPoints;
  }

  static isSpawning(creep: Creep): boolean {
    return creep.spawning;
  }

  static isTired(creep: Creep): boolean {
    return creep.fatigue > 0;
  }

  static isEmpty(creep: Creep): boolean {
    return creep.store.getUsedCapacity() === 0;
  }

  static isFull(creep: Creep): boolean {
    return creep.store.getFreeCapacity() === 0;
  }

  static hasEnergy(creep: Creep): boolean {
    return creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
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

  static getPartAmount(creep: Creep, bodyPart: BodyPartConstant): number {
    return creep.body.filter(part => part.type === bodyPart).length;
  }
}
