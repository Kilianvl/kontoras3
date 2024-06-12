import { Fields, Validators } from 'remult';
import { SearchableEntity } from './searchable-entity';

export const salutations = ['Herr', 'Frau', 'divers'] as const;
type SalutationType = (typeof salutations)[number];

@SearchableEntity(Customer, 'customers', {
  allowApiCrud: true,
  searchFields: ['firstname', 'lastname', 'createdAt'],
})
export class Customer {
  @Fields.cuid()
  id = '';

  @Fields.literal(() => salutations, { allowNull:true, caption: 'Anrede' , inputType: 'select-literal'})
  salutation?: SalutationType;

  @Fields.string({ caption: 'Vorname', validate: Validators.required("Der Vorname muss gesetzt werden.") })
  firstname = '';

  @Fields.string({ caption: 'Nachname', validate: Validators.required  })
  lastname = '';

  @Fields.string({ caption: 'Straße' })
  street = '';

  @Fields.string({ caption: 'PLZ' })
  zip = '';

  @Fields.string({ caption: 'Stadt' })
  city = '';

  @Fields.string({ caption: 'Land' })
  country = '';

  @Fields.boolean({ caption: 'Archiviert'})
  archived = false;

  @Fields.createdAt({ caption: 'Erstellt am', allowApiUpdate: false })
  createdAt?: Date;
}
