import { Document } from 'flexsearch';
import { Entity, Fields } from 'remult';
import { initSearchIndex } from '../../server/search';
import { AppEntity } from './app-entity';

@Entity('customers', {
  allowApiCrud: true,
})
export class Customer extends AppEntity {

  @Fields.string()
  firstname = '';

  @Fields.string()
  lastname = '';

  @Fields.boolean()
  archived = false;

  @Fields.createdAt()
  createdAt?: Date;
}

initSearchIndex(Customer, ['firstname', 'lastname', 'createdAt']);
