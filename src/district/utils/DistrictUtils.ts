export default class DistrictUtils {
  static getStoredEnergy(districtRoom: Room): number {
    const containersEnergy = DistrictUtils.getContainersEnergy(districtRoom);
    const storageEnergy = DistrictUtils.getStorageEnergy(districtRoom);
    return storageEnergy + containersEnergy;
  }

  static getContainersEnergy(districtRoom: Room): number {
    const containers = districtRoom.find(
      FIND_STRUCTURES, {filter: (structure): boolean => structure.structureType === STRUCTURE_CONTAINER}
    );

    return containers.reduce((totalEnergy, container) => {
      if (container.structureType === STRUCTURE_CONTAINER) {
        return totalEnergy + container.store.getUsedCapacity(RESOURCE_ENERGY);
      }
      return totalEnergy;
    }, 0);
  }

  static getStorageEnergy(districtRoom: Room): number {
    const storage: StructureStorage | undefined = districtRoom.storage;
    if (!storage) {
      return 0;
    }
    return storage.store.getUsedCapacity(RESOURCE_ENERGY);
  }
}
