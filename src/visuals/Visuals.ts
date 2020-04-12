export default class Visuals {
  static drawFatigue(): void {
    Object.values(Game.creeps).forEach((creep) => {
      if (creep.fatigue > 0) {
        const style: CircleStyle = {
          radius: 0.625, stroke: '#3498DB', strokeWidth: 0.075, fill: ''
        };
        creep.room.visual.circle(creep.pos, style);
      }
    });
  }

  static draw(): void {
    Visuals.drawFatigue();
  }
}
