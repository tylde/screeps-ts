/* eslint-disable @typescript-eslint/no-explicit-any */

export default class ArrayHelper {
  static removeElementFromIndex(array: any[], indexToRemove: number): any[] {
    return [...array.slice(0, indexToRemove), ...array.slice(indexToRemove + 1)];
  }
}
