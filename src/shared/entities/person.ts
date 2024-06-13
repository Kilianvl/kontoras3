import { Fields, Validators } from 'remult';
import { SearchableEntity } from './searchable-entity';
import { Customer } from './customer';

export const salutations = ['Herr', 'Frau', 'divers'] as const;
type SalutationType = (typeof salutations)[number];

@SearchableEntity(Person, 'persons', {
  allowApiCrud: true,
  searchFields: ['firstname', 'lastname', 'customerNumber','position'],
})
export class Person  extends Customer {

  @Fields.literal(() => salutations, {
    allowNull: true,
    caption: 'Anrede',
    inputType: 'select-literal',
  })
  salutation?: SalutationType;

  @Fields.string({ caption: 'Titel' })
  title = '';

  @Fields.string({ caption: 'Vorname' })
  firstname = '';

  @Fields.string({ caption: 'Nachname', validate: [Validators.required('Bitte geben Sie einen Nachnamen ein.')]})
  lastname = '';

  @Fields.string({ caption: 'Namenszusatz' })
  nameAddon = '';

  @Fields.string({ caption: 'Position' })
  position = '';


}
