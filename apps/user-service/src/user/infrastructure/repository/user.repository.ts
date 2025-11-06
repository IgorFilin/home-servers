import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserDomain } from '../../domain/user.domain';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userModel: Repository<UserEntity>
  ) {}

  findUser(options: Record<string, string>) {
    return this.userModel.findOneBy(options);
  }

  async createUser(user: UserDomain) {
    const newUser = this.userModel.create(user.getPlainObjectData());
    await this.userModel.save(newUser);
  }
}
