import { KNOWLEDGE_SERVICE } from '@home-servers/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class KnowledgeService {
  constructor(
    @Inject(KNOWLEDGE_SERVICE) private readonly knowledgeService: ClientProxy
  ) {}

  articles() {
    return this.knowledgeService.send({ cmd: 'articles' }, {});
  }
}
