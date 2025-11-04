/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  HttpException,
  HttpStatus,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway/gateway.module';
import { ERROR_EXEPTION, HttpExceptionFilter } from '@home-servers/shared';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const globalPrefix = 'gateway';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Authorization'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: () => {
        throw new HttpException(
          ERROR_EXEPTION.VALIDATION_REG,
          HttpStatus.BAD_REQUEST
        );
      },
    })
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
