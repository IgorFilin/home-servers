import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from '@home-servers/shared';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { JwtStrategy } from './strategies/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

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
    ]),
  ],
  controllers: [GatewayController],
  providers: [ConfigService, GatewayService, JwtStrategy],
})
export class GatewayModule {}
