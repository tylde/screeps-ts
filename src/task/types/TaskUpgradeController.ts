import Task from '../Task';
import TASK_PRIORITIES from '../config/TaskPriorities';

import SettlerUtils from '../../settler/utils/SettlerUtils';
import SettlerHandler from '../../settler/SettlerHandler';
import Log from '../../console/Log';
import SettlerCommands from '../../settler/utils/SettlerCommands';
import TaskHandler from '../TaskHandler';

const TASK_TYPE: TaskType = 'TASK_UPGRADE_CONTROLLER';

const PHASE = {
  GET_ENERGY: 'GET_ENERGY',
  UPGRADE: 'UPGRADE'
};

export default class TaskUpgradeController extends Task {
  constructor(provinceName: string) {
    const type = TASK_TYPE;
    const priority = TASK_PRIORITIES[TASK_TYPE];
    const assignableSettlers: SettlerRole[] = ['SETTLER_WORKER'];

    const data = {};

    super(type, provinceName, priority, assignableSettlers, data);
  }

  static run(creep: Creep, taskId: string): void {
    const {name: settlerName} = creep;
    const task: Task = TaskHandler.get(taskId);
    const {type} = task;

    if (creep.memory.taskPhase === PHASE.GET_ENERGY) {
      const source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (!source) {
        Log.debug(`[${type}] ${settlerName} No sources found.`);
        return;
      }
      if (SettlerCommands.mineSource(creep, source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {}});
      }
    } else if (creep.memory.taskPhase === PHASE.UPGRADE) {
      if (creep.room.controller) {
        if (SettlerCommands.upgradeController(creep, creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, {visualizePathStyle: {}});
        }
      }
    } else {
      SettlerHandler.setTaskPhase(settlerName, PHASE.GET_ENERGY);
    }

    if (creep.memory.taskPhase === PHASE.GET_ENERGY && SettlerUtils.isFull(creep)) {
      SettlerHandler.setTaskPhase(settlerName, PHASE.UPGRADE);
    } else if (creep.memory.taskPhase === PHASE.UPGRADE && !SettlerUtils.hasEnergy(creep)) {
      SettlerHandler.setTaskPhase(settlerName, PHASE.GET_ENERGY);
    }
  }
}
