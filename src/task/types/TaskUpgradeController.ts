import Task from '../Task';
import TASK_PRIORITIES from '../config/TaskPriorities';

import SettlerUtils from '../../settler/utils/SettlerUtils';

const TASK_TYPE: TaskType = 'TASK_UPGRADE_CONTROLLER';

export default class TaskUpgradeController extends Task {
  constructor(provinceName: string, fromId: string, toId: string) {
    const type = TASK_TYPE;
    const priority = TASK_PRIORITIES[TASK_TYPE];
    const assignableSettlers: SettlerRole[] = ['SETTLER_WORKER'];

    const data = {
      fromId,
      toId
    };

    super(type, provinceName, priority, assignableSettlers, data);
  }

  static run(creep: Creep): void {
    if (SettlerUtils.isEmpty(creep)) {
      //
    } else if (SettlerUtils.hasEnergy(creep)) {
      //
    }
  }
}
