export default class Mine implements MineMemory {
  id: string;
  districtName: string;
  position: ElementPosition;
  availableMinePositions: ElementPosition[];

  provinceName: string | null;
  assignedTaskId: string | null;
  containerId: string | null;
  linkId: string | null;

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
    this.linkId = null;
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
