import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  envConfiguration,
  jwtConfiguration,
  typeormConfiguration,
} from './configuration';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UserEntity } from './infrastructure/entities/user.entity';
import { UserKeyResetPass } from './infrastructure/entities/userKeyResetPass.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegistrationCommandHandler } from './use-cases/registration.use-case';
import { RefreshTokenEntity } from './infrastructure/entities/token.entity';
import { AuthService } from './application/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(envConfiguration()),
    TypeOrmModule.forRootAsync(typeormConfiguration()),
    JwtModule.registerAsync(jwtConfiguration()),
    TypeOrmModule.forFeature([
      UserEntity,
      UserKeyResetPass,
      RefreshTokenEntity,
    ]),
    CqrsModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    RegistrationCommandHandler,
    AuthService,
  ],
})
export class UserModule {}
