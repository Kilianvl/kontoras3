import { Fields, Relations } from "remult";
import { Base } from "./base";
import { Address } from "./address";

/**
 * Represents a customer entity.
 */
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
  @Relations.toMany(() => Address, 'customerId')
  addresses?: Address[]

}
