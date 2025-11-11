import { Injectable } from '@nestjs/common';

@Injectable()
export class KnowledgeService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
