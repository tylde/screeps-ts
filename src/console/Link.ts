export default class Link {
  static toRoom(roomName: string): string {
    return '<a href="#!/room/' + Game.shard.name + '/' + roomName + '">[' + roomName + ']</a>';
  }

  static toCapital(provinceName: string): string {
    const province = Memory.provinces[provinceName];
    const capital = province.capitalName;
    return '<a href="#!/room/' + Game.shard.name + '/' + capital + '">[' + provinceName + ']</a>';
  }
}
