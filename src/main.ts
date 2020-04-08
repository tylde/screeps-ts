import MemoryHandler from './memory/MemoryHandler';
import Realm from './realm/realm';
import ScreepsConsole from './console/console';

ScreepsConsole.init();

function main(): void {
  MemoryHandler.init();
  MemoryHandler.clean();

  Realm.init();
  Realm.run();
}

export const loop = main;
