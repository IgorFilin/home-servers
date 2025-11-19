import { RegistrationDto } from '@home-servers/shared';
import { compare, genSalt, hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { UserEntity } from '../infrastructure/entities/user.entity';

export class UserDomain {
  private _id: string;
  private _email: string;
  private _name: string;
  private _password: string;
  private _acceptKey: string;
  private _ip: string;
  private _role: string;
  private _createdAt: Date;
  private _refreshTokens: string[] = [];

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
    const acceptKey = randomBytes(5).toString('hex');
    const user = new UserDomain();

    user._email = email;
    user._name = name;
    user._role = 'user';
    user._ip = 'Скрыт';
    user._acceptKey = acceptKey;
    user._createdAt = new Date();
    user._password = hashPassword;

    return user;
  }

  getPlainObjectData(): Partial<UserEntity> {
    return {
      email: this._email,
      name: this._name,
      password: this._password,
      acceptKey: this._acceptKey,
      ip: this._ip,
    };
  }
}
