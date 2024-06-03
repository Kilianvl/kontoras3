import { Entity, Fields } from 'remult'

@Entity('customers', {
  allowApiCrud: true,
})
export class Customer {
  @Fields.cuid()
  id = ''

  @Fields.string()
  firstname = ''

  @Fields.string()
  lastname = '';

  @Fields.boolean()
  archived = false

  @Fields.createdAt()
  createdAt?: Date
}
