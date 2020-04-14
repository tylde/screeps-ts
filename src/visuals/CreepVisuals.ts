export default class CreepVisuals {
  static drawCreepsCircle(creep: Creep): void {
    if (creep.spawning) {
      return;
    }

    let strokeColor: string;
    if (creep.hits < creep.memory.lastHitPoints) {
      strokeColor = '#E74C3C';
    } else if (creep.hits > creep.memory.lastHitPoints) {
      strokeColor = '#27AE60';
    } else if (creep.fatigue > 0) {
      strokeColor = '#3498DB';
    } else {
      strokeColor = '';
    }
    if (strokeColor) {
      const style: CircleStyle = {radius: 0.45, stroke: strokeColor, strokeWidth: 0.11, fill: '', opacity: 0.6};
      creep.room.visual.circle(creep.pos, style);
    }
  }

  static drawFatigue(creep: Creep): void {
    CreepVisuals.drawCreepsCircle(creep);
  }

  static draw(): void {
    Object.values(Game.creeps).forEach((creep) => {
      CreepVisuals.drawFatigue(creep);
    });
  }
}
