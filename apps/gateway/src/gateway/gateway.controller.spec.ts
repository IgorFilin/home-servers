import { Test, TestingModule } from '@nestjs/testing';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [GatewayService],
    }).compile();
  });

  describe('getData', () => {});
});
