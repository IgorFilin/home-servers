import { Injectable } from '@nestjs/common';
import { KnowledgeRepository } from './infrastructure/repository/knowledge.repository';
import { ArticleEntity } from './infrastructure/entities/article.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetArticleQuery } from './use-cases/query/get-article.use-case';
import { GetTagsQuery } from './use-cases/query/get-tags.use-case';
import { TagsEntity } from './infrastructure/entities/tags.entity';
import { CreateArticleCommand } from './use-cases/command/create-article.use-case';
import { CreateArticleDto } from '@home-servers/shared';

@Injectable()
export class KnowledgeService {
  constructor(
    private readonly knowledgeRepository: KnowledgeRepository,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  articles(filter: string): Promise<ArticleEntity[]> {
    return this.knowledgeRepository.getArticlesForFilter(filter);
  }

  article(id: string): Promise<ArticleEntity[]> {
    return this.queryBus.execute(new GetArticleQuery(id));
  }

  tags(filter: string): Promise<TagsEntity> {
    return this.queryBus.execute(new GetTagsQuery(filter));
  }

  createArticle(
    createArticlePayload: CreateArticleDto,
    userId: string
  ): Promise<any> {
    return this.commandBus.execute(
      new CreateArticleCommand(createArticlePayload, userId)
    );
  }
}
