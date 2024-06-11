import { Fields } from 'remult';
import { SearchableEntity } from './searchable-entity';

@SearchableEntity(Customer, 'customers', {
  allowApiCrud: true,
  searchFields: ['firstname', 'lastname', 'createdAt']
})
export class Customer {
  @Fields.cuid()
  id = '';

  @Fields.string()
  firstname = '';

  @Fields.string()
  lastname = '';

  @Fields.boolean()
  archived = false;

  @Fields.createdAt()
  createdAt?: Date;
}
