import { Fields, Validators } from 'remult';
import { SearchableEntity } from './searchable-entity';
import { Customer } from './customer';

export const salutations = ['Herr', 'Frau', 'divers'] as const;
type SalutationType = (typeof salutations)[number];

@SearchableEntity(Person, 'persons', {
  allowApiCrud: true,
  searchFields: ['firstname', 'lastname', 'customerNumber','position'],
  deleted: async (person, e) => {
    await Customer.onDeleted(person, e);
  }
})
/**
 * Represents a person entity.
 */
export class Person extends Customer {

  /**
   * The salutation of the person.
   */
  @Fields.literal(() => salutations, {
    allowNull: true,
    caption: 'Anrede',
    inputType: 'select-literal',
  })
  salutation?: SalutationType;

  /**
   * The title of the person.
   */
  @Fields.string({ caption: 'Titel' })
  title = '';

  /**
   * The first name of the person.
   */
  @Fields.string({ caption: 'Vorname' })
  firstname = '';

  /**
   * The last name of the person.
   */
  @Fields.string({ caption: 'Nachname', validate: [Validators.required('Bitte geben Sie einen Nachnamen ein.')]})
  lastname = '';

  /**
   * The name addon of the person.
   */
  @Fields.string({ caption: 'Namenszusatz' })
  nameAddon = '';

  /**
   * The position of the person.
   */
  @Fields.string({ caption: 'Position' })
  position = '';

  get displayName() {
    return this.firstname + ' ' + this.lastname;
  }

  get customerType() {
    return 'Person';
  }
}
