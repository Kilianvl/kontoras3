import { Fields, Validators } from 'remult';
import { Customer } from './customer';
import { SearchableEntity } from './searchable-entity';


@SearchableEntity(Company, 'companys', {
  allowApiCrud: true,
  searchFields: ['name', 'customerNumber'],
})
export class Company  extends Customer {

  @Fields.string({ caption: 'Name der Organisation', validate: [Validators.required('Bitte geben Sie einen Namen für die Organisation ein.')]})
  name = '';

  @Fields.string({ caption: 'Namenszusatz' })
  nameAddon = '';

}
