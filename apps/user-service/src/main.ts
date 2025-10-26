import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://filin:adunaggenu1@192.168.0.125:5672'],
        queue: 'user_queue',
        queueOptions: {
          durable: true,
        },
      },
    }
  );
  await app.listen();
}
bootstrap();
