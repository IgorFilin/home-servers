import { RegistrationDto } from '@home-servers/shared';
import { compare, genSalt, hash } from 'bcrypt';
import { randomBytes } from 'crypto';

export class UserDomain {
  private constructor(
    public readonly email: string,
    public readonly login: string,
    public password: string,
    public readonly confirmRegKey: string,
    public readonly ip: string
  ) {}

  public validatePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return compare(password, hashPassword);
  }

  static async create(createUserDTO: RegistrationDto) {
    const { password, email, name } = createUserDTO;
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    const confirmRegKey = randomBytes(5).toString('hex');
    const ip = 'Скрыт';

    return new UserDomain(email, name, hashPassword, confirmRegKey, ip);
  }

  getPlainObjectData(): Partial<UserDomain> {
    return {
      email: this.email,
      login: this.login,
      password: this.password,
      confirmRegKey: this.confirmRegKey,
      ip: this.ip,
    };
  }
}
