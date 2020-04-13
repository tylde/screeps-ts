import Mine from '../resources/Mine';
import Quarry from '../resources/Quarry';

import MineHandler from '../resources/MineHandler';
import QuarryHandler from '../resources/QuarryHandler';

export default class District implements RoomMemory {
  name: string;
  provinceName: string;
  type: DistrictType;
  mines: string[];
  quarry: string;

  constructor(districtName: string, provinceName: string, type: DistrictType) {
    this.name = districtName;
    this.provinceName = provinceName;
    this.type = type;

    const room: Room = Game.rooms[districtName];
    const sources: Source[] = room.find(FIND_SOURCES);
    const minerals: Mineral[] = room.find(FIND_MINERALS);

    const mines: string[] = sources.map((source: Source) => source.id);
    const quarry: string = minerals.map((mineral: Mineral) => mineral.id)[0];

    this.mines = mines;
    this.quarry = quarry;

    sources.forEach((source: Source) => {
      const mineElement: Mine = new Mine(source);
      MineHandler.add(source.id, mineElement);
    });
    minerals.forEach((mineral: Mineral) => {
      const {id, pos: {x, y}, mineralType, density} = mineral;
      const position: ElementPosition = {x, y, roomName: districtName};
      const quarryElement: Quarry = new Quarry(id, districtName, position, mineralType, density);
      QuarryHandler.add(id, quarryElement);
    });
  }

  // ===================================================================================================================

  static get(districtName: string): District {
    return Memory.rooms[districtName];
  }

  static initDistricts(): void {
    Memory.rooms = {};
  }

  static addToMemory(districtName: string, district: District): void {
    Memory.rooms = {...Memory.rooms, [districtName]: district};
  }

  static updateInMemory(districtName: string, district: District): void {
    Memory.rooms[districtName] = district;
  }

  static deleteFromMemory(districtName: string): void {
    delete Memory.rooms[districtName];
  }

  // ===================================================================================================================
}
