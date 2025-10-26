import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrastructure/repository/user.repository';
import { IUser } from '@home-servers/shared';

@Injectable()
export class AppService {
  constructor(private userRepository: UserRepository) {}
  createUser(user: IUser) {
    const newUser = this.userRepository.create(user);
    return newUser;
  }
}
