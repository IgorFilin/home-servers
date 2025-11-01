import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { UserEntity } from '../infrastructure/entities/user.entity';
import { UserKeyResetPass } from '../infrastructure/entities/userKeyResetPass.entity';

export function typeormConfiguration(): TypeOrmModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('BD_HOST'),
      port: configService.get('BD_PORT'),
      username: configService.get('BD_USERNAME'),
      password: configService.get('BD_PASSWORD'),
      database: configService.get('BD_DATABASE'),
      entities: [UserEntity, UserKeyResetPass],
      synchronize: false,
      // autoLoadEntities: true,
    }),
    inject: [ConfigService],
  };
}
