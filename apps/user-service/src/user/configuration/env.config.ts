import { ConfigModuleOptions } from '@nestjs/config';

export function envConfiguration(): ConfigModuleOptions {
  return {
    isGlobal: true,
    envFilePath: '.env',
  };
}
