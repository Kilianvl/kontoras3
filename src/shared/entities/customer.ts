import { Fields, LifecycleEvent, Relations } from 'remult';
import { Base } from './base';
import { Address } from './address';

/**
 * Represents a customer entity.
 */
export abstract class Customer extends Base {
  /**
   * The customer number.
   */
  @Fields.string({ caption: 'Kunden-Nr.' })
  customerNumber = '';

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
    await e.relations.addresses.deleteMany({where: {customerId: entity.id}})
  }
}
