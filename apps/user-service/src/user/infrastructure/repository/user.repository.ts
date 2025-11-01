import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from '@home-servers/shared';
import { UserEntity } from '../entities/user.entity';
import { UserDomain } from '../../domain/user.domain';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { error } from 'console';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userModel: Repository<UserEntity>
  ) {}

  async create(user: IUser) {
    const newUser = this.userModel.create(user);
    await this.userModel.save(newUser);
    return newUser;
  }
}
