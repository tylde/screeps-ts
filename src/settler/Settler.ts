export default class Settler {
  name: string;
  role: SettlerRole;
  provinceName: string;
  task: TaskType;

  constructor(name: string, role: SettlerRole, provinceName: string) {
    this.name = name;
    this.role = role;
    this.provinceName = provinceName;
    this.task = '';
  }

  static get(settlerName: string): Settler {
    return Memory.settlers[settlerName];
  }

  // static run(settlerName: string): void {
  //   const settler: Settler = Settler.get(settlerName);
  // }
}
