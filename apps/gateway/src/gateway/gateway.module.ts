import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KNOWLEDGE_SERVICE, USER_SERVICE } from '@home-servers/shared';
import { GatewayController } from './gateway.controller';
import { JwtStrategy } from './strategies/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './services/user/user.service';
import { KnowledgeService } from './services/knowledge/knowledge.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://filin:adunaggenu1@192.168.0.125:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: KNOWLEDGE_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://filin:adunaggenu1@192.168.0.125:5672'],
          queue: 'knowledge_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [ConfigService, UserService, KnowledgeService, JwtStrategy],
})
export class GatewayModule {}
