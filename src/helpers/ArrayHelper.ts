/* eslint-disable @typescript-eslint/no-explicit-any, max-len */

import Log from '../console/Log';

export default class ArrayHelper {
  static removeElementFromIndex(array: any[], indexToRemove: number): any[] {
    if (indexToRemove < -1 || indexToRemove > array.length - 1) {
      Log.debug(`ArrayHelper.removeElementFromIndex got wrong indexToRemove (array length: ${array.length} indexToRemove: ${indexToRemove})`);
      return array;
    }
    return [...array.slice(0, indexToRemove), ...array.slice(indexToRemove + 1)];
  }
}
