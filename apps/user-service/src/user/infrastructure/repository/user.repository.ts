import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from '@home-servers/shared';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userModel: Repository<UserEntity>
  ) {}

  findUser(email: string) {
    return this.userModel.findOneBy({
      email,
    });
  }
}
