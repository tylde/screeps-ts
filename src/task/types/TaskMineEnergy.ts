import Task from '../Task';
import TASK_PRIORITIES from '../config/TaskPriorities';

import Mine from '../../resources/Mine';
import SettlerCommands from '../../settler/utils/SettlerCommands';
import Log from '../../console/Log';
import {TASK_MINE_ENERGY} from '../config/TasksConstants';
import {SETTLER_MINER} from '../../settler/config/SettlerConstants';

const TASK_TYPE = TASK_MINE_ENERGY;

export default class TaskMineEnergy extends Task {
  constructor(provinceName: string, mineId: string) {
    const type = TASK_TYPE;
    const priority = TASK_PRIORITIES[TASK_TYPE];
    const assignableSettlers: SettlerRole[] = [SETTLER_MINER];

    const data: TaskData = {
      mineId
    };

    super(type, provinceName, priority, assignableSettlers, data);
  }

  static run(creep: Creep, taskId: string): void {
    const task: Task = Task.get(taskId);
    const {mineId} = task.data;

    if (!mineId) {
      Log.debug(`[${TASK_TYPE}] Task ${taskId} has not assigned mineId.`);
      return;
    }

    const {position: {roomName: mineRoomName, x: minePositionX, y: minePositionY}, containerId} = Mine.get(mineId);
    const {roomName: creepRoomName, creepPositionX, creepPositionY} = creep.pos;

    if (creepRoomName !== mineRoomName) {
      SettlerCommands.moveToRoom(creep, mineRoomName);
    }

    if (containerId) {

    }
  }
}
