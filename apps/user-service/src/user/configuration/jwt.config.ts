import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export function jwtConfiguration(): JwtModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('SECRET_REGISTER_KEY'),
      signOptions: {
        expiresIn: '1h',
      },
    }),
    inject: [ConfigService],
  };
}
