
import {Entity, Fields} from 'remult';

@Entity('user',{
  allowApiCrud: true,
})
export class User {
  static hash = async (password: string) => password;


  @Fields.cuid()
  id!: string;

  @Fields.string()
  name = '';
  @Fields.string({includeInApi:false})
  password = '';

  @Fields.string<User>({
    serverExpression: () => '',
    saving: async (user, fieldRef, e) => {
      if(fieldRef.valueChanged()) {
        user.password = await User.hash(user.updatePassword)
      }
    }
  })
  updatePassword = '';

  @Fields.boolean()
  active = true;

  @Fields.boolean()
  isAdmin = false;
}
