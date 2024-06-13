import { Fields, Validators } from 'remult';
import { Customer } from './customer';
import { SearchableEntity } from './searchable-entity';


@SearchableEntity(Company, 'companys', {
  allowApiCrud: true,
  searchFields: ['name', 'customerNumber'],
})
/**
 * Represents a company entity.
 * @extends Customer
 */
export class Company extends Customer {

  /**
   * The name of the organization.
   * @remarks This field is required.
   */
  @Fields.string({ caption: 'Name der Organisation', validate: [Validators.required('Bitte geben Sie einen Namen für die Organisation ein.')]})
  name = '';

  /**
   * The name addon for the organization.
   */
  @Fields.string({ caption: 'Namenszusatz' })
  nameAddon = '';

}
