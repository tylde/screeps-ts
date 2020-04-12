import Task from '../Task';
import TASK_PRIORITIES from '../config/TaskPriorities';

import Log from '../../console/Log';

import SettlerUtils from '../../settler/utils/SettlerUtils';
import {TASK_BOOTSTRAP_PROVINCE} from '../config/TasksConstants';
import {SETTLER_PIONEER} from '../../settler/config/SettlerConstants';

const TASK_TYPE = TASK_BOOTSTRAP_PROVINCE;

export default class TaskBootstrapProvince extends Task {
  constructor(provinceName: string) {
    const type = TASK_TYPE;
    const priority = TASK_PRIORITIES[TASK_TYPE];
    const assignableSettlers: SettlerRole[] = [SETTLER_PIONEER];

    const data = {};

    super(type, provinceName, priority, assignableSettlers, data);
  }

  static run(creep: Creep, taskId: string): void {
    const {name: settlerName} = creep;
    const task: Task = Task.get(taskId);
    const {type} = task;

    if (!SettlerUtils.isFull(creep)) {
      const source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (!source) {
        Log.debug(`[${type}] ${settlerName} No sources found.`);
        return;
      }
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {}});
      }
    } else if (SettlerUtils.hasEnergy(creep)) {
      const spawns = creep.room.find(FIND_MY_SPAWNS);
      if (spawns.length === 0) {
        Log.debug(`[${type}] ${settlerName} No spawns found.`);
        return;
      }
      const spawn = spawns[0];
      if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn, {visualizePathStyle: {}});
      }
    } else {
      Log.debug(`[${creep.name}] [${type}] Should not went here!`);
    }
  }
}
