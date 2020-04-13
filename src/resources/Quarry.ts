export default class Quarry implements QuarryMemory {
  id: string;
  districtName: string;
  position: ElementPosition;
  mineralType: MineralConstant;
  mineralDensity: number;

  provinceName: string | null;
  assignedTaskId: string | null;
  containerId: string | null;
  linkId: string | null;

  constructor(
    id: string, districtName: string, position: ElementPosition, mineralType: MineralConstant, mineralDensity: number
  ) {
    this.id = id;
    this.districtName = districtName;
    this.position = position;
    this.mineralType = mineralType;
    this.mineralDensity = mineralDensity;

    this.provinceName = null;
    this.assignedTaskId = null;
    this.containerId = null;
    this.linkId = null;
  }
}
