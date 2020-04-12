import Log from '../console/Log';

import District from '../district/District';
import Garrison from '../garrison/Garrison';
import Mine from '../resources/Mine';
import Province from '../province/Province';
import Quarry from '../resources/Quarry';
import Settler from '../settler/Settler';
import Task from '../task/Task';
import Directive from '../directives/Directive';

class GarbageCollector {
  static cleanDistricts(): void {
    if (!Memory.rooms) {
      return;
    }
    Object.keys(Memory.rooms).forEach((districtName) => {
      if (!(districtName in Game.rooms)) {
        Log.debug(`Deleting district ${districtName} from memory`);
        const {provinceName, mines, quarry} = District.get(districtName);
        Province.deleteDistrict(provinceName, districtName);
        mines.forEach(mineId => Mine.deleteFromMemory(mineId));
        Quarry.deleteFromMemory(quarry);
        District.deleteFromMemory(districtName);
      }
    });
  }

  static cleanSettlers(): void {
    if (!Memory.creeps) {
      return;
    }
    Object.keys(Memory.creeps).forEach((settlerName) => {
      if (!(settlerName in Game.creeps)) {
        Log.debug(`Deleting settler ${settlerName} from memory`);
        const {provinceName, assignedTaskId} = Settler.get(settlerName);
        Province.deleteSettler(provinceName, settlerName);
        if (assignedTaskId) {
          Task.unassignTask(assignedTaskId, settlerName);
        }
        Settler.deleteFromMemory(settlerName);
      }
    });
  }

  static cleanGarrisons(): void {
    if (!Memory.spawns) {
      return;
    }
    Object.keys(Memory.spawns).forEach((garrisonName) => {
      if (!(garrisonName in Game.spawns)) {
        Log.debug(`Deleting garrison ${garrisonName} from memory`);
        const {provinceName} = Garrison.get(garrisonName);
        Province.deleteGarrison(provinceName, garrisonName);
        Garrison.deleteFromMemory(garrisonName);
      }
    });
  }

  static cleanDoneTasks(): void {
    Object.entries(Memory.tasks).forEach(([taskId, task]) => {
      const {isDone, assignedSettlerName, provinceName} = task;
      if (isDone) {
        if (assignedSettlerName) {
          Settler.unassignTask(assignedSettlerName, taskId);
        }
        Province.deleteTask(provinceName, taskId);
        Task.deleteFromMemory(taskId);
      }
    });
  }

  static clean(): void {
    this.cleanDistricts();
    this.cleanSettlers();
    this.cleanGarrisons();
    this.cleanDoneTasks();
  }

  static cleanMemoryAfterDefeat(): void {
    if (Object.keys(Game.creeps).length > 0 || Object.keys(Game.spawns).length > 0) {
      return;
    }

    if (
      Object.keys(Memory.provinces).length === 0
      && Object.keys(Memory.rooms).length === 0
      && Object.keys(Memory.spawns).length === 0
      && Object.keys(Memory.creeps).length === 0
      && Object.keys(Memory.mines).length === 0
      && Object.keys(Memory.quarries).length === 0
    ) {
      return;
    }

    Log.info('Cleaning memory after defeat');
    GarbageCollector.delete();
  }

  static delete(): void {
    delete Memory.realm;

    Province.initProvinces();
    District.initDistricts();
    Settler.initSettlers();
    Garrison.initGarrisons();

    Mine.initMines();
    Quarry.initQuarries();

    Task.initTasks();
    Directive.initDirectives();
  }
}

export default GarbageCollector;
