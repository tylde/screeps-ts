import Task from '../Task';
import TASK_PRIORITIES from '../config/TaskPriorities';

import SettlerUtils from '../../settler/utils/SettlerUtils';
import {SETTLER_CARRIER} from '../../settler/config/SettlerConstants';
import {TASK_TRANSPORT_ENERGY} from '../config/TasksConstants';

const TASK_TYPE = TASK_TRANSPORT_ENERGY;

export default class TransportEnergyTask extends Task {
  constructor(provinceName: string, fromId: string, toId: string) {
    const type = TASK_TYPE;
    const priority = TASK_PRIORITIES[TASK_TYPE];
    const assignableSettlers: SettlerRole[] = [SETTLER_CARRIER];

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
