import { Fields, Relations, Validators } from 'remult';
import { Base } from './base';
import { SearchableEntity } from './searchable-entity';

export const amountTypes = [
  'Stk',
  'Std',
  'm',
  'm²',
  'm³',
  'kg',
  't',
  'lfm',
  'pauschal',
  'km',
  '%',
  'Tag(e)',
  'L'
] as const;
type AmountType = (typeof amountTypes)[number];

@SearchableEntity(InvoiceItem, 'invoice-items', {
  allowApiCrud: true,
  searchFields: ['invoiceId', 'name', 'description'],
})
/**
 * Represents an invoice entity.
 */
export class InvoiceItem extends Base {

  @Fields.string({ caption: 'Invoice-ID' })
  invoiceId = '';

  @Fields.string({ caption: 'Produkt oder Dienstleistung' })
  name = '';

  @Fields.string({ caption: 'Beschreibung' })
  description = '';

  @Fields.string({ caption: 'Menge' })
  amount = '';

  @Fields.literal(() => amountTypes, {
    caption: 'Mengentyp',
    allowNull: true,
    inputType: 'select-literal',
  })
  amountType?: AmountType;

  @Fields.number({ caption: 'Preis' })
  price = 0;

  @Fields.number({ caption: 'USt.' })
  vat = 0;

  @Fields.number({ caption: 'Rabatt' })
  discount = 0;

  @Fields.string({ caption: 'Rabatt-Typ' })
  discountType: '%' | 'Euro' = '%';
}
