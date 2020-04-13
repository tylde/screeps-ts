import Log from './console/Log';

import GarbageCollector from './memory/GarbageCollector';
import Realm from './realm/realm';
import ScreepsConsole from './console/ScreepsConsole';
import Settings from './settings/Settings';
import Visuals from './visuals/Visuals';

ScreepsConsole.init();
Settings.init({showDebugLogs: true});

function main(): void {
  // console.log(`===== Tick: ${Game.time} =====`);
  try {
    // const startCpu = Game.cpu.getUsed();

    GarbageCollector.cleanMemoryAfterDefeat();
    Realm.prepare();

    GarbageCollector.clean();
    Realm.run();
    Visuals.draw();

    // Log.debug(`Tick usage: ${Game.cpu.getUsed() - startCpu}`);
  } catch (error) {
    Log.error(error.stack);
  }
}

export const loop = main;
