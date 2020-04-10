import Settler from './Settler';
import MiningTask from '../task/MiningTask';

export default class Pioneer {
  static run(creep: Creep): void {
    const settlerName: string = creep.name;
    const settler = Settler.get(settlerName);

    const {currentTask} = settler;

    if (currentTask === '') {
      Settler.setCurrentTask(settlerName, 'MINE');
    }

    if (currentTask === 'MINE') {
      if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        MiningTask.run(creep);
      } else {
        Settler.setCurrentTask(settlerName, 'TRANSPORT');
      }
    }

    if (currentTask === 'TRANSPORT') {
      //
    }
  }
}
