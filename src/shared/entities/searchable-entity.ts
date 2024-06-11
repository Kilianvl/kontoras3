import { ClassType, Entity, EntityOptions } from 'remult';

export const searchProxy = {
  updateEntityIndex: async(entity: any) => { },
  deleteEntityIndex: async (entity: any) => { },
  initEntityIndex: (entityType: any, fields: string[]) => { },
};

export function SearchableEntity<T>(entityType: ClassType<T>,
  key: string,
  options: EntityOptions<
    T extends new (...args: any) => any
      ? InstanceType<T>
      : T
  > & { searchFields: string[]}
) {

  searchProxy.initEntityIndex(entityType, options.searchFields);

  return Entity(key, {
    ...options,
    saved: async (item, e) => {
      console.log('Entity saved', item);
      await options?.saved?.(item, e);
      await searchProxy.updateEntityIndex(item);
    },
    deleted: async (item, e) => {
      console.log('Entity deleted', item);
      await options?.deleted?.(item, e);
      await searchProxy.deleteEntityIndex(item);
    },
  });
}


