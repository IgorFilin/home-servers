import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [KnowledgeController],
      providers: [KnowledgeService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<KnowledgeController>(KnowledgeController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
