import Log from '../../console/Log';

import Task from '../Task';
import TASK_PRIORITIES from '../config/TaskPriorities';

import SettlerCommands from '../../settler/utils/SettlerCommands';

import MineHandler from '../../resources/MineHandler';
import SettlerHandler from '../../settler/SettlerHandler';
import TaskHandler from '../TaskHandler';

const TASK_TYPE: TaskType = 'TASK_MINE_ENERGY';

const PHASE = {
  MOVE: 'MOVE',
  MINE: 'MINE'
};

export default class TaskMineEnergy extends Task {
  constructor(provinceName: string, mineId: string) {
    const type = TASK_TYPE;
    const priority = TASK_PRIORITIES[TASK_TYPE];
    const assignableSettlers: SettlerRole[] = ['SETTLER_MINER'];

    const data: TaskData = {
      mineId
    };

    super(type, provinceName, priority, assignableSettlers, data);
  }

  static run(creep: Creep, taskId: string): void {
    const {name: settlerName} = creep;
    const task: Task = TaskHandler.get(taskId);
    const {mineId} = task.data;

    if (!mineId) {
      Log.debug(`[${TASK_TYPE}] Task ${taskId} has not assigned mineId.`);
      return;
    }

    const {
      position: {roomName: mineRoomName, x: minePositionX, y: minePositionY}, containerId
    } = MineHandler.get(mineId);
    const {roomName: creepRoomName, x: creepPositionX, y: creepPositionY} = creep.pos;

    if (creep.memory.taskPhase === PHASE.MOVE) {
      if (containerId) {
        const container: StructureContainer | null = Game.getObjectById(containerId);
        if (container) {
          creep.moveTo(container, {visualizePathStyle: {}});
        }
      } else {
        SettlerCommands.moveToPosition(creep, minePositionX, minePositionY);
      }
    } else if (creep.memory.taskPhase === PHASE.MINE) {
      SettlerCommands.mine(creep, mineId);
    } else {
      // TODO REMOVE CIRCULAR
      SettlerHandler.setTaskPhase(settlerName, PHASE.MOVE);
    }

    if (creepRoomName !== mineRoomName) {
      // SettlerCommands.moveToRoom(creep, mineRoomName);
    }


    // TODO REFACTOR THIS SHIT
    if (creep.memory.taskPhase === PHASE.MOVE) {
      if (containerId) {
        const container: StructureContainer | null = Game.getObjectById(containerId);
        if (container) {
          const {x: containerPositionX, y: containerPositionY} = container.pos;
          if (containerPositionX === creepPositionX && containerPositionY === creepPositionY) {
            SettlerHandler.setTaskPhase(settlerName, PHASE.MINE);
          }
        }
      } else if (creep.pos.inRangeTo(minePositionX, minePositionY, 1)) {
        SettlerHandler.setTaskPhase(settlerName, PHASE.MINE);
      }
    }
  }
}
