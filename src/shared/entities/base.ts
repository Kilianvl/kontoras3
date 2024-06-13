import { Fields } from "remult";

export abstract class Base {
  @Fields.cuid()
  id = '';

  @Fields.createdAt({ caption: 'Erstellt am', allowApiUpdate: false })
  createdAt?: Date;

  @Fields.updatedAt ({ caption: 'Aktualisiert am', allowApiUpdate: false })
  updatedAt?: Date;

  @Fields.boolean({ caption: 'Archiviert' })
  archived = false;

}
