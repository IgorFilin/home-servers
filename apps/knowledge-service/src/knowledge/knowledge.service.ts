import { Injectable } from '@nestjs/common';
import { KnowledgeRepository } from './infrastructure/repository/knowledge.repository';
import { ArticleEntity } from './infrastructure/entities/article.entity';
import { QueryBus } from '@nestjs/cqrs';
import { GetArticleQuery } from './use-cases/query/get-article.use-case';
import { GetTagsQuery } from './use-cases/query/get-tags.use-case';

@Injectable()
export class KnowledgeService {
  constructor(
    private readonly knowledgeRepository: KnowledgeRepository,
    private readonly queryBus: QueryBus
  ) {}

  articles(filter: string): Promise<ArticleEntity[]> {
    return this.knowledgeRepository.getArticlesForFilter(filter);
  }

  article(id: string): Promise<ArticleEntity[]> {
    return this.queryBus.execute(new GetArticleQuery(id));
  }

  tags(filter: string): Promise<ArticleEntity[]> {
    return this.queryBus.execute(new GetTagsQuery(filter));
  }
}
