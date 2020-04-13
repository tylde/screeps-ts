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
      const mineId = source.id;
      MineHandler.add(mineId, mineElement);
      if (type === 'DISTRICT_CAPITAL') {
        MineHandler.setProvinceName(mineId, provinceName);
      }
    });
    minerals.forEach((mineral: Mineral) => {
      const {id, pos: {x, y}, mineralType, density} = mineral;
      const position: ElementPosition = {x, y, roomName: districtName};
      const quarryElement: Quarry = new Quarry(id, districtName, position, mineralType, density);
      QuarryHandler.add(id, quarryElement);
      if (type === 'DISTRICT_CAPITAL') {
        QuarryHandler.setProvinceName(id, provinceName);
      }
    });
  }
}
