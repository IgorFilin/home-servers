import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { KnowledgeRepository } from '../../infrastructure/repository/knowledge.repository';

export class GetArticleQuery {
  constructor(public readonly articleId: string) {}
}

@QueryHandler(GetArticleQuery)
export class GetArticleHandler implements IQueryHandler<GetArticleQuery> {
  constructor(private readonly knowledgeRepository: KnowledgeRepository) {}

  async execute(query: GetArticleQuery) {
    const articleId = query.articleId;

    const article = await this.knowledgeRepository.getArticleById(articleId);
    return { ...article };
  }
}
