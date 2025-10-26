import { IUser, IUserRoles } from '@home-servers/shared';
import { compare, genSalt, hash } from 'bcrypt';

export class User implements IUser {
  id: string;
  ip: string;
  email: string;
  name: string;
  password: string;
  isAcceptKey: boolean;
  acceptKey: string;
  authToken: string;
  userPhoto: string;
  role: IUserRoles;
  resetPasswordKey: string;

  constructor(private userData: IUser) {
    this.id = userData.id;
    this.email = userData.email;
    this.name = userData.name;
    this.role = userData.role;
  }

  public async setPassword(password: string): Promise<IUser> {
    const salt = await genSalt(10);
    this.password = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
