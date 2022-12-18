import { MockModel } from '../../../../database/test/support/mock.model';
import { User } from '../../schemas/auth.schema';
import { userStubOne } from '../stubs/user.stub';

export class UserModel extends MockModel<User> {
  protected entityStub = userStubOne();
}
