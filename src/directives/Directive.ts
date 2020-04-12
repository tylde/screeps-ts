export default class Directive {
  id: string;
  type: string;
  priority: number;

  constructor(id: string, type: string, priority: number) {
    this.id = id;
    this.type = type;
    this.priority = priority;
  }

  // ===================================================================================================================

  static get(directiveId: string): Directive {
    return Memory.directives[directiveId];
  }

  static initDirectives(): void {
    Memory.directives = {};
  }

  static addToMemory(directiveId: string, province: Directive): void {
    Memory.directives = {...Memory.directives, [directiveId]: province};
  }

  static updateInMemory(directiveId: string, province: Directive): void {
    Memory.directives[directiveId] = province;
  }

  static deleteFromMemory(directiveId: string): void {
    delete Memory.provinces[directiveId];
  }

  // ===================================================================================================================
}
