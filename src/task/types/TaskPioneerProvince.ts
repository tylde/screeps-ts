import Log from '../../console/Log';

import Task from '../Task';
import TASK_PRIORITIES from '../config/TaskPriorities';

import SettlerHandler from '../../settler/SettlerHandler';
import SettlerUtils from '../../settler/utils/SettlerUtils';
import TaskHandler from '../TaskHandler';
import SettlerCommands from '../../settler/utils/SettlerCommands';

const TASK_TYPE: TaskType = 'TASK_PIONEER_PROVINCE';

const PHASE = {
  MINE: 'MINE',
  CARRY: 'CARRY'
};

export default class TaskPioneerProvince extends Task {
  constructor(provinceName: string) {
    const type = TASK_TYPE;
    const priority = TASK_PRIORITIES[TASK_TYPE];
    const assignableSettlers: SettlerRole[] = ['SETTLER_PIONEER'];

    const data = {};

    super(type, provinceName, priority, assignableSettlers, data);
  }

  static run(creep: Creep, taskId: string): void {
    const {name: settlerName} = creep;
    const task: Task = TaskHandler.get(taskId);
    const {type} = task;

    if (creep.memory.taskPhase === PHASE.MINE) {
      const source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (!source) {
        Log.debug(`[${type}] ${settlerName} No sources found.`);
        return;
      }
      if (SettlerCommands.mineSource(creep, source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {}});
      }
    } else if (creep.memory.taskPhase === PHASE.CARRY) {
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
      SettlerHandler.setTaskPhase(settlerName, PHASE.MINE);
    }

    if (creep.memory.taskPhase === PHASE.MINE && SettlerUtils.isFull(creep)) {
      SettlerHandler.setTaskPhase(settlerName, PHASE.CARRY);
    } else if (creep.memory.taskPhase === PHASE.CARRY && !SettlerUtils.hasEnergy(creep)) {
      SettlerHandler.setTaskPhase(settlerName, PHASE.MINE);
    }
  }
}
