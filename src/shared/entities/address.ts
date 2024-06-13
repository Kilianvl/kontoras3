import { Fields, Relations } from 'remult';
import { Base } from './base';
import { SearchableEntity } from './searchable-entity';
import { Customer } from './customer';

export const addressTypes = ['Arbeit', 'Privat', 'Rechnungsanschrift', 'Lieferanschrift', 'Abholanschrift'] as const;
type AddressType = (typeof addressTypes)[number];

@SearchableEntity(Address, 'addresses', {
  allowApiCrud: true,
  searchFields: ['street', 'zip', 'city','country'],
})
export class Address  extends Base {

  @Fields.string({ caption: 'Straße' })
  street = '';

  @Fields.string({ caption: 'PLZ' })
  zip = '';

  @Fields.string({ caption: 'Stadt' })
  city = '';

  @Fields.string({ caption: 'Land' })
  country = '';

  @Fields.literal(() => addressTypes,{ caption: 'Typ', allowNull: true, inputType: 'select-literal'})
  addressType?: AddressType;
}
