import Task from '../Task';
import TASK_PRIORITIES from '../config/TaskPriorities';

import Mine from '../../resources/Mine';
import SettlerCommands from '../../settler/utils/SettlerCommands';
import Log from '../../console/Log';
import Settler from '../../settler/Settler';

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
    const task: Task = Task.get(taskId);
    const {mineId} = task.data;

    if (!mineId) {
      Log.debug(`[${TASK_TYPE}] Task ${taskId} has not assigned mineId.`);
      return;
    }

    const {position: {roomName: mineRoomName, x: minePositionX, y: minePositionY}, containerId} = Mine.get(mineId);
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
      Settler.setTaskPhase(settlerName, PHASE.MOVE);
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
            Settler.setTaskPhase(settlerName, PHASE.MINE);
          }
        }
      } else if (creep.pos.inRangeTo(minePositionX, minePositionY, 1)) {
        Settler.setTaskPhase(settlerName, PHASE.MINE);
      }
    }
  }
}
