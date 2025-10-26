import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  envConfiguration,
  jwtConfiguration,
  typeormConfiguration,
} from '../configuration';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../infrastructure/repository/user.repository';
import { UserEntity } from '../infrastructure/entities/user.entity';
import { UserKeyResetPass } from '../infrastructure/entities/userKeyResetPass.entity';

@Module({
  imports: [
    ConfigModule.forRoot(envConfiguration()),
    TypeOrmModule.forRootAsync(typeormConfiguration()),
    JwtModule.registerAsync(jwtConfiguration()),
    TypeOrmModule.forFeature([UserEntity, UserKeyResetPass]),
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository],
})
export class AppModule {}
