import { Entity, Fields } from 'remult';
import { deleteEntityIndex, updateEntityIndex } from '../../server/search';


@Entity<AppEntity>('AppEntity', {
  saved: (entity, e) => {
    console.log('Entity saved', entity);
     updateEntityIndex(entity);
  },
  deleted: async (entity, e) => {
    console.log('Entity deleted', entity);
    await deleteEntityIndex(entity);
  },
})
export class AppEntity {
  @Fields.cuid()
  id = '';
}
