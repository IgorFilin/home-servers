import { Test } from '@nestjs/testing';
import { KnowledgeService } from './knowledge.service';

describe('KnowledgeService', () => {
  let service: KnowledgeService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [KnowledgeService],
    }).compile();

    service = app.get<KnowledgeService>(KnowledgeService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
