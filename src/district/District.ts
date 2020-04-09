export default class District {
  name: string;
  provinceName: string;
  type: DistrictType;

  constructor(name: string, provinceName: string, type: DistrictType) {
    this.name = name;
    this.provinceName = provinceName;
    this.type = type;
  }

  static get(districtName: string): District {
    return Memory.districts[districtName];
  }
}
