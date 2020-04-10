import Log from './console/Log';

import GarbageCollector from './memory/GarbageCollector';
import Realm from './realm/realm';
import ScreepsConsole from './console/console';
import Settings from './settings/Settings';

ScreepsConsole.init();
Settings.init();

function main(): void {
  // console.log(`===== Tick: ${Game.time} =====`);
  try {
    GarbageCollector.cleanMemoryAfterDefeat();
    Realm.init();

    GarbageCollector.clean();
    Realm.run();
  } catch (error) {
    Log.error(error.stack);
  }
}

export const loop = main;
