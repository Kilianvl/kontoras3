import { Fields, LifecycleEvent, Relations, Validators, remult } from 'remult';
import { Base } from './base';
import { Address } from './address';
import { NumberRange } from './number-range';

/**
 * Represents a customer entity.
 */
export abstract class Customer extends Base {
  /**
   * The customer number.
   */
  @Fields.string({ caption: 'Kunden-Nr.', validate: Validators.unique() })
  customerNumber = '';

  /**
   * The sequence number.
   */
  @Fields.number({ includeInApi: false })
  sequenceNumber: number | undefined = undefined;

  /**
   * The addresses associated with the customer.
   */
  @Relations.toMany(() => Address, {
    field: 'customerId',
    defaultIncluded: true,
  })
  addresses?: Address[] = [];

  abstract get displayName(): string;

  abstract get customerType(): string;

  static async onDeleted(entity: Customer, e: LifecycleEvent<Customer>) {
    await e.relations.addresses.deleteMany({
      where: { customerId: entity.id },
    });
  }

  async previewCustomerNumber() {
    const repo = remult.repo(NumberRange);
    const numberRange = await repo.findOne({
      where: { numberRangeType: 'Kundennummern' },
    });
    const customerNumber = numberRange!.formatNextSequenceValue();
    return customerNumber;
  }

  async createSequenceNumber() {
    const repo = remult.repo(NumberRange);
    const numberRange = await repo.findOne({
      where: { numberRangeType: 'Kundennummern' },
    });
    const sequenceNumber = numberRange!.nextSequenceValue;
    numberRange!.nextSequenceValue++;
    await repo.save(numberRange!);
    return sequenceNumber;
  }

  async createCustomerNumber(sequenceNumber: number) {
    const repo = remult.repo(NumberRange);
    const numberRange = await repo.findOne({
      where: { numberRangeType: 'Kundennummern' },
    });
    const customerNumber = numberRange!.formatSequenceValue(sequenceNumber);
    return customerNumber;
  }
}
