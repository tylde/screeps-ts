import CreepVisuals from './CreepVisuals';
import RoomVisuals from './RoomVisuals';

export default class Visuals {
  static draw(): void {
    CreepVisuals.draw();
    RoomVisuals.draw();
  }
}
