import MemoryHandler from './memory/MemoryHandler';
import Realm from './realm/realm';
import ScreepsConsole from './console/console';
import Settings from './settings/Settings';
import Log from './console/Log';

ScreepsConsole.init();

MemoryHandler.delete();
Settings.init();
Realm.init();

function main(): void {
  // console.log(`===== Tick: ${Game.time} ============================================================================`);
  try {
    MemoryHandler.clean();
    Realm.run();
  } catch (error) {
    Log.error(error.stack);

    MemoryHandler.delete();
    Settings.init();
    Realm.init();
  }
}

export const loop = main;
