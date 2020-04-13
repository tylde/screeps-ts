import Log from '../console/Log';

import DirectiveHandler from '../directives/DirectiveHandler';
import DistrictHandler from '../district/DistrictHandler';
import GarrisonHandler from '../garrison/GarrisonHandler';
import MineHandler from '../resources/MineHandler';
import ProvinceHandler from '../province/ProvinceHandler';
import QuarryHandler from '../resources/QuarryHandler';
import SettlerHandler from '../settler/SettlerHandler';
import TaskHandler from '../task/TaskHandler';

class GarbageCollector {
  static deleteDistrict(districtName: string): void {
    const {provinceName, mines, quarry} = DistrictHandler.get(districtName);
    ProvinceHandler.deleteDistrict(provinceName, districtName);
    mines.forEach(mineId => MineHandler.delete(mineId));
    QuarryHandler.delete(quarry);
    DistrictHandler.delete(districtName);
  }

  static deleteSettler(settlerName: string): void {
    const {provinceName, assignedTaskId} = SettlerHandler.get(settlerName);
    ProvinceHandler.deleteSettler(provinceName, settlerName);
    if (assignedTaskId) {
      TaskHandler.unassignTask(assignedTaskId, settlerName);
    }
    SettlerHandler.delete(settlerName);
  }

  static deleteGarrison(garrisonName: string): void {
    const {provinceName} = GarrisonHandler.get(garrisonName);
    ProvinceHandler.deleteGarrison(provinceName, garrisonName);
    GarrisonHandler.delete(garrisonName);
  }

  static deleteTask(taskId: string): void {
    const {assignedSettlerName, provinceName} = TaskHandler.get(taskId);
    if (assignedSettlerName) {
      SettlerHandler.unassignTask(assignedSettlerName, taskId);
    }
    ProvinceHandler.deleteTask(provinceName, taskId);
    TaskHandler.delete(taskId);
  }

  static cleanDistricts(): void {
    if (!Memory.rooms) {
      return;
    }
    Object.keys(Memory.rooms).forEach((districtName) => {
      if (!(districtName in Game.rooms)) {
        Log.debug(`Deleting district ${districtName} from memory`);
        GarbageCollector.deleteDistrict(districtName);
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
        GarbageCollector.deleteSettler(settlerName);
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
        GarbageCollector.deleteGarrison(garrisonName);
      }
    });
  }

  static cleanDoneTasks(): void {
    Object.entries(Memory.tasks).forEach(([taskId, task]) => {
      const {isDone} = task;
      if (isDone) {
        Log.debug(`Deleting taskId ${taskId} from memory`);
        GarbageCollector.deleteTask(taskId);
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

    ProvinceHandler.init();
    DistrictHandler.init();
    SettlerHandler.init();
    GarrisonHandler.init();

    MineHandler.init();
    QuarryHandler.init();

    TaskHandler.init();
    DirectiveHandler.init();
  }
}

export default GarbageCollector;
