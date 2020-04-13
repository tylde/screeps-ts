export default class DirectiveHandler {
  static get(directiveId: string): DirectiveMemory {
    return Memory.directives[directiveId];
  }

  static init(): void {
    Memory.directives = {};
  }

  static add(directiveId: string, province: DirectiveMemory): void {
    Memory.directives = {...Memory.directives, [directiveId]: province};
  }

  static update(directiveId: string, province: DirectiveMemory): void {
    Memory.directives[directiveId] = province;
  }

  static delete(directiveId: string): void {
    delete Memory.provinces[directiveId];
  }
}
