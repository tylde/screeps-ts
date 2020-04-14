import ProvinceHandler from '../../province/ProvinceHandler';

export default class CarriersGuild {
  static manageTasks(provinceName: string): void {
    const province = ProvinceHandler.get(provinceName);
  }

  static calculateRequiredCarriers(provinceName: string): number {
    return 0;
  }
}
