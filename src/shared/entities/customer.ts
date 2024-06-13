import { Fields, Relations } from "remult";
import { Base } from "./base";
import { Address } from "./address";

export abstract class Customer extends Base {

  @Fields.string({ caption: 'Kunden-Nr.' })
  customerNumber = '';

  @Fields.json({ caption: 'Addressen' })
  addresses?: Address[]

}
