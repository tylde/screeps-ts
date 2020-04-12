type TASK_BOOTSTRAP_PROVINCE = 'TASK_BOOTSTRAP_PROVINCE';
type TASK_BUILD_CONTAINER_FOR_MINE = 'TASK_BUILD_CONTAINER_FOR_MINE';
type TASK_MINE_ENERGY = 'TASK_MINE_ENERGY';
type TASK_TRANSPORT_ENERGY = 'TASK_TRANSPORT_ENERGY';
type TASK_EXTRACT_MINERAL = 'TASK_EXTRACT_MINERAL';
type TASK_SCOUT_DYNAMIC = 'TASK_SCOUT_DYNAMIC';

type TaskType =
  TASK_BOOTSTRAP_PROVINCE
  | TASK_BUILD_CONTAINER_FOR_MINE
  | TASK_EXTRACT_MINERAL
  | TASK_MINE_ENERGY
  | TASK_TRANSPORT_ENERGY
  | TASK_SCOUT_DYNAMIC;
