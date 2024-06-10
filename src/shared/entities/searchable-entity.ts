import { Entity, Fields } from 'remult';
import { deleteEntityIndex, updateEntityIndex } from '../../server/search';


@Entity<SearchableEntity>('AppEntity', {
  saved: (entity, e) => {
    console.log('Entity saved', entity);
     updateEntityIndex(entity);
  },
  deleted: async (entity, e) => {
    console.log('Entity deleted', entity);
    await deleteEntityIndex(entity);
  },
})
export class SearchableEntity {
  @Fields.cuid()
  id = '';
}
