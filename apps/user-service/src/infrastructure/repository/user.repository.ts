import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from '@home-servers/shared';
import { UserEntity } from '../entities/user.entity';
import { UserDomain } from '../../domain/user.domain';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userModel: Repository<UserEntity>
  ) {}

  async create(user: IUser) {
    try {
      const newUser = this.userModel.create(user);
      console.log('newUser', newUser);
      await this.userModel.save(newUser);
      return newUser;
    } catch (e) {
      console.log(e);
      return { error: 'true' };
    }
  }
}
