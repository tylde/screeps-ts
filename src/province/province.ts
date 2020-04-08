export class Province {
  name: string;
  capital: string;
  districts: string[];
  settlers: string[];

  constructor(name: string, capital: Room) {
    this.name = name;
    this.capital = capital.name;
    this.districts = [];
    this.settlers = [];
  }
}
