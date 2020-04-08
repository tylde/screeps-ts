export default class Realm {
  provinces: string[];
  initializationTick: number;

  constructor() {
    this.provinces = [];
    this.initializationTick = Game.time;
  }

  static init(): void {
    if (Memory.realm) {
      return;
    }

    console.log('Initializing realm...');

    Memory.realm = new Realm();

    this.initializeProvinces();
    this.initializeDistricts();
    this.initializeSettlers();
  }

  static initializeProvinces(): void {
    //
  }

  static initializeDistricts(): void {
    //
  }

  static initializeSettlers(): void {
    //
  }

  static run(): void {
    console.log(`Current game tick is ${Game.time}`);
  }
}
