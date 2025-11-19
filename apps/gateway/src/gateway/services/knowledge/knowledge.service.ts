import { CreateArticleDto, KNOWLEDGE_SERVICE } from '@home-servers/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class KnowledgeService {
  constructor(
    @Inject(KNOWLEDGE_SERVICE) private readonly knowledgeService: ClientProxy
  ) {}

  articles(filter: string) {
    return this.knowledgeService.send({ cmd: 'articles' }, { filter });
  }

  article(id: string) {
    return this.knowledgeService.send({ cmd: 'article' }, { id });
  }

  tags(filter: string) {
    return this.knowledgeService.send({ cmd: 'tags' }, { filter });
  }

  createArticle(createArticleDto: CreateArticleDto, userId: string) {
    return this.knowledgeService.send(
      { cmd: 'create-article' },
      { createArticleDto, userId }
    );
  }
}
