import SETTLER_PATTERNS from '../config/SettlerPatterns';

type BlueprintType = 'SPECIFIED' | 'MAX_N' | 'UP_TO_N'

const patternChunkRegex = /([*^]?\d\w)/;
const partDefinitonRegex = /[A-Z]/;
const amountRegex = /\d+/;

interface BlueprintChunk {
  blueprintType: BlueprintType;
  partDefiniton: string;
  partAmount: number;
}

type Blueprint = BlueprintChunk[];

export default class SettlerBody {
  static getBodyPartFromPartDefinition(definition: string): BodyPartConstant {
    switch (definition) {
      case 'W':
        return WORK;
      case 'M':
        return MOVE;
      case 'C':
        return CARRY;
      case 'A':
        return ATTACK;
      case 'R':
        return RANGED_ATTACK;
      case 'H':
        return HEAL;
      case 'L':
        return CLAIM;
      case 'T':
        return TOUGH;
      default:
        return TOUGH;
    }
  }

  static calculateRequiredEnergy(body: BodyPartConstant[]): number {
    return body.reduce((requiredEnergy, bodyPart) => requiredEnergy + BODYPART_COST[bodyPart], 0);
  }

  static getBlueprintType(patternChunk: string): BlueprintType {
    if (patternChunk.startsWith('*')) {
      return 'MAX_N';
    }
    if (patternChunk.startsWith('^')) {
      return 'UP_TO_N';
    }
    return 'SPECIFIED';
  }

  static decodeBodyPatternToBlueprint(pattern: string): Blueprint {
    const patternChunks: string[] = pattern.split(patternChunkRegex).filter(element => element);
    return patternChunks.map(patternChunk => {
      const blueprintType: BlueprintType = SettlerBody.getBlueprintType(patternChunk);

      const partDefinitonMatch = patternChunk.match(partDefinitonRegex);
      const partAmountMatch = patternChunk.match(amountRegex);

      const partDefiniton = partDefinitonMatch ? partDefinitonMatch[0] : '';
      const partAmount = partAmountMatch ? +(partAmountMatch[0]) : 0;

      return {blueprintType, partDefiniton, partAmount};
    });
  }

  static isBlueprintDynamic(blueprint: Blueprint): boolean {
    return blueprint.findIndex(element => ['MAX_N', 'UP_TO_N'].includes(element.blueprintType)) > -1;
  }

  static getBodyFromStaticBlueprint(blueprint: Blueprint, energyCapacityAvailable: number): BodyPartConstant[] {
    const settlerBody: BodyPartConstant[] = [];
    blueprint.forEach((blueprintChunk) => {
      const {partDefiniton, partAmount} = blueprintChunk;
      for (let i = 0; i < partAmount; i++) {
        settlerBody.push(SettlerBody.getBodyPartFromPartDefinition(partDefiniton));
      }
    });
    const requiredEnergy = SettlerBody.calculateRequiredEnergy(settlerBody);
    if (requiredEnergy > energyCapacityAvailable) {
      return [];
    }
    return settlerBody;
  }

  static getBodyFromDynamicBlueprint(blueprint: Blueprint, energyCapacityAvailable: number): BodyPartConstant[] {
    let latestRequiredEnergy = 0;
    let currentIteration = 1;
    let result: BodyPartConstant[] = [];
    let watchDog = 0;

    while (latestRequiredEnergy < energyCapacityAvailable) {
      const currentBody: BodyPartConstant[] = [];

      blueprint.forEach((blueprintChunk) => {
        const {partAmount, blueprintType, partDefiniton} = blueprintChunk;

        const bodyPart: BodyPartConstant = SettlerBody.getBodyPartFromPartDefinition(partDefiniton);

        if (blueprintType === 'MAX_N') {
          for (let i = 0; i < currentIteration; i++) {
            currentBody.push(bodyPart);
          }
        } else if (blueprintType === 'UP_TO_N') {
          for (let i = 0; i < currentIteration; i++) {
            if (i < partAmount) {
              currentBody.push(bodyPart);
            }
          }
        } else {
          for (let i = 0; i < partAmount; i++) {
            currentBody.push(bodyPart);
          }
        }
      });

      const requiredEnergy = SettlerBody.calculateRequiredEnergy(currentBody);

      if (requiredEnergy <= energyCapacityAvailable) {
        result = currentBody;
      }

      if (latestRequiredEnergy === requiredEnergy) {
        break;
      }

      latestRequiredEnergy = requiredEnergy;
      currentIteration++;
      watchDog++;

      if (watchDog > 1000) {
        return [];
      }
    }

    return result;
  }

  static calculateBodyFromPattern(bodyPattern: string, energyCapacityAvailable: number): BodyPartConstant[] {
    const blueprint = SettlerBody.decodeBodyPatternToBlueprint(bodyPattern);
    const isDynamic: boolean = SettlerBody.isBlueprintDynamic(blueprint);

    if (!isDynamic) {
      return SettlerBody.getBodyFromStaticBlueprint(blueprint, energyCapacityAvailable);
    }
    return SettlerBody.getBodyFromDynamicBlueprint(blueprint, energyCapacityAvailable);
  }

  static calculateBodyToSpawn(settlerRole: SettlerRole, energyCapacityAvailable: number): BodyPartConstant[] {
    const bodyPattern = SETTLER_PATTERNS[settlerRole];
    return SettlerBody.calculateBodyFromPattern(bodyPattern, energyCapacityAvailable);
  }
}
