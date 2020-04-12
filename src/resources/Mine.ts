export default class Mine {
  id: string;
  districtName: string;
  position: ElementPosition;
  availableMinePositions: ElementPosition[];

  provinceName: string | null;
  assignedTaskId: string | null;
  containerId: string | null;

  constructor(source: Source) {
    const {id, pos: {x, y, roomName}} = source;
    const position: ElementPosition = {x, y, roomName};

    this.id = id;
    this.districtName = roomName;
    this.position = position;
    this.availableMinePositions = Mine.getAvailableMinePositions(source);

    this.provinceName = null;
    this.assignedTaskId = null;
    this.containerId = null;
  }

  // ===================================================================================================================

  static get(mineId: string): Mine {
    return Memory.mines[mineId];
  }

  static initMines(): void {
    Memory.mines = {};
  }

  static addToMemory(mineId: string, mine: Mine): void {
    Memory.mines = {...Memory.mines, [mineId]: mine};
  }

  static updateInMemory(mineId: string, mine: Mine): void {
    Memory.mines[mineId] = mine;
  }

  static deleteFromMemory(mineId: string): void {
    delete Memory.mines[mineId];
  }

  // ===================================================================================================================

  static getAvailableMinePositions(source: Source): ElementPosition[] {
    const availablePositions: ElementPosition[] = [];
    const {pos: {x, y, roomName}, room} = source;
    const roomTerrain = room.getTerrain();
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (!(i === 0 && j === 0)) {
          const positionX: number = x + i;
          const positionY: number = y + j;
          const result = roomTerrain.get(positionX, positionY);
          if (TERRAIN_MASK_WALL !== result) {
            availablePositions.push({x: positionX, y: positionY, roomName});
          }
        }
      }
    }
    return availablePositions;
  }
}
