import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { KnowledgeModule } from './knowledge/knowledge.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    KnowledgeModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://filin:adunaggenu1@192.168.0.125:5672'],
        queue: 'knowledge_queue',
        queueOptions: {
          durable: true,
        },
      },
    }
  );
  await app.listen();
}
bootstrap();
