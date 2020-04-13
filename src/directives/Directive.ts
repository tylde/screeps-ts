export default class Directive implements DirectiveMemory {
  id: string;
  type: string;
  priority: number;

  constructor(id: string, type: string, priority: number) {
    this.id = id;
    this.type = type;
    this.priority = priority;
  }
}
