import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from '@home-servers/shared';
import { UserEntity } from '../entities/user.entity';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userModel: Repository<UserEntity>
  ) {}

  create(user: IUser) {
    const newUser = this.userModel.create(user);
    console.log('newUser', newUser);
  }
}
