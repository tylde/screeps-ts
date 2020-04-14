import ProvinceHandler from '../province/ProvinceHandler';
import SettlerHandler from '../settler/SettlerHandler';

import SETTLER_NAMES from '../settler/config/SettlerNames';

export default class RoomVisuals {
  static drawSettlerRoleInformation(
    roomVisual: RoomVisual,
    x: number,
    y: number,
    {name, currentSettlers, requiredSettlers}: {name: string; currentSettlers: number; requiredSettlers: number}
  ): void {
    const text = `${name}`;
    const information = `${currentSettlers}/${requiredSettlers}`;
    roomVisual.text(text, x, y, {align: 'left', font: '0.8 monospace'});
    roomVisual.text(information, x + 8, y, {align: 'right', font: '0.8 monospace'});
  }

  static drawCapital(room: Room): void {
    const {provinceName} = room.memory;
    const {visual} = room;
    const province = ProvinceHandler.get(provinceName);
    const {requiredSettlers, settlersNames} = province;

    const settlers = settlersNames.map(settlerName => SettlerHandler.get(settlerName));
    const drawData = Object.entries(requiredSettlers).map(([settlerRole, required]) => {
      const currentSettlers: number = settlers.filter(settler => settler.role === settlerRole).length;
      return {name: SETTLER_NAMES[settlerRole], currentSettlers, requiredSettlers: required};
    }).filter(data => !(data.currentSettlers === 0 && data.requiredSettlers === 0));

    drawData.forEach((data, index) => {
      RoomVisuals.drawSettlerRoleInformation(visual, 2, 2 + index, data);
    });
  }

  static draw(): void {
    Object.values(Game.rooms).forEach((room) => {
      if (room.memory.type === 'DISTRICT_CAPITAL') {
        RoomVisuals.drawCapital(room);
      }
    });
  }
}
