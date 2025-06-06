import { Fields, LifecycleEvent, Relations, Validators, remult } from 'remult';
import { Base } from './base';
import { InvoiceItem } from './invoice-item';
import { SearchableEntity } from './searchable-entity';
import { NumberRange } from './number-range';

export const vatTypes = ['Brutto', 'Netto'] as const;
type VatType = (typeof vatTypes)[number];

@SearchableEntity(Invoice, 'invoices', {
  allowApiCrud: true,
  searchFields: [
    'customerId',
    'address',
    'subject',
    'invoiceNumber',
    'reference',
  ],
  deleted: async (person, e) => {
    await Invoice.onDeleted(person, e);
  },
  saving: async (entity, event) => {
    if (!entity.invoiceNumber) {
      entity.sequenceNumber = await entity.createSequenceNumber();
      entity.invoiceNumber = await entity.createInvoiceNumber(
        entity.sequenceNumber
      );
    }
  },
})
/**
 * Represents an invoice entity.
 */
export class Invoice extends Base {
  /**
   * The sequence number.
   */
  @Fields.number({ includeInApi: false })
  sequenceNumber: number | undefined = undefined;

  /**
   * The customer ID associated with this invoice.
   */
  @Fields.string({ caption: 'Kunden-ID' })
  customerId = '';

  @Fields.string({ caption: 'Anschrift', inputType: 'multiline' })
  address = '';

  @Fields.string({ caption: 'Betreff' })
  subject = '';

  @Fields.string({ caption: 'Rechnungs-Nr.' })
  invoiceNumber = '';

  @Fields.dateOnly({ caption: 'Rechnungsdatum' })
  invoiceDate = new Date();

  @Fields.string({ caption: 'Referenz' })
  reference = '';

  @Fields.string({ caption: 'Kopf-Text', inputType: 'multiline' })
  headerText = '';

  @Fields.string({ caption: 'Fuß-Text', inputType: 'multiline' })
  footerText = '';

  @Fields.literal(() => vatTypes, {
    caption: 'Typ',
    allowNull: true,
    inputType: 'select-literal',
  })
  vatType?: VatType = 'Netto';

  /**
   * The invoice items associated with the invoice.
   */
  @Relations.toMany(() => InvoiceItem, {
    field: 'invoiceId',
    defaultIncluded: true,
  })
  items?: InvoiceItem[] = [];

  get displayName() {
    return `${this.invoiceNumber} ${this.subject}`;
  }

  get netTotal() {
    if (this.vatType === 'Netto') {
      return this.items!.reduce((sum, item) => sum + item.total, 0);
    } else {
      return this.items!.reduce(
        (sum, item) => sum + item.total / (1 + item.vat / 100),
        0
      );
    }
  }

  get grossTotal() {
    if (this.vatType === 'Brutto') {
      return this.items!.reduce((sum, item) => sum + item.total, 0);
    } else {
      return this.items!.reduce(
        (sum, item) => sum + item.total * (1 + item.vat / 100),
        0
      );
    }
  }

  get vatTotals(): { vat: number; total: number }[] {
    const vatTotals = new Map<number, number>();
    this.items!.forEach((item) => {
      const vat = item.vat;
      let total;
      if (this.vatType === 'Brutto') {
        total = item.total * (vat / (100 + vat));
      } else {
        total = item.total * (vat / 100);
      }
      vatTotals.set(vat, (vatTotals.get(vat) || 0) + total);
    });
    return Array.from(vatTotals.entries()).map(([vat, total]) => ({
      vat,
      total,
    }));
  }

  static async onDeleted(entity: Invoice, e: LifecycleEvent<Invoice>) {
    await e.relations.items.deleteMany({
      where: { invoiceId: entity.id },
    });
  }

  async previewInvoiceNumber() {
    const repo = remult.repo(NumberRange);
    const numberRange = await repo.findOne({
      where: { numberRangeType: 'Rechnungsnummern' },
    });
    const invoiceNumber = numberRange!.formatNextSequenceValue();
    return invoiceNumber;
  }

  async createSequenceNumber() {
    const repo = remult.repo(NumberRange);
    const numberRange = await repo.findOne({
      where: { numberRangeType: 'Rechnungsnummern' },
    });
    const sequenceNumber = numberRange!.nextSequenceValue;
    numberRange!.nextSequenceValue++;
    await repo.save(numberRange!);
    return sequenceNumber;
  }

  async createInvoiceNumber(sequenceNumber: number) {
    const repo = remult.repo(NumberRange);
    const numberRange = await repo.findOne({
      where: { numberRangeType: 'Rechnungsnummern' },
    });
    const invoiceNumber = numberRange!.formatSequenceValue(sequenceNumber);
    return invoiceNumber;
  }
}
