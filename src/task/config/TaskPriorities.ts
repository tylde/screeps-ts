import * as TASK_CONSTANTS from './TasksConstants';

const TASK_PRIORITIES = {
  [TASK_CONSTANTS.TASK_PIONEER_PROVINCE]: 50,
  [TASK_CONSTANTS.TASK_MINE_ENERGY]: 100,
  [TASK_CONSTANTS.TASK_TRANSPORT_ENERGY]: 150,
  [TASK_CONSTANTS.TASK_BUILD_CONTAINER_FOR_MINE]: 200,
  [TASK_CONSTANTS.TASK_BUILD_STRUCTURE]: 250,
  [TASK_CONSTANTS.TASK_EXTRACT_MINERAL]: 300,
  [TASK_CONSTANTS.TASK_SCOUT_DYNAMIC]: 350
};

export default TASK_PRIORITIES;
