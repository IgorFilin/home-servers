import { Injectable } from '@nestjs/common';
import { UserRepository } from './infrastructure/repository/user.repository';
import { IUser } from '@home-servers/shared';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: IUser) {
    const newUser = await this.userRepository.create(user);
    return newUser;
  }
}
