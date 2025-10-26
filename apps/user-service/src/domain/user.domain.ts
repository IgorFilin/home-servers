import { compare, genSalt, hash } from 'bcrypt';

export class UserDomain {
  public async setPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    return hashPassword;
  }

  public validatePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return compare(password, hashPassword);
  }
}
