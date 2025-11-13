import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { KnowledgeRepository } from '../../infrastructure/repository/knowledge.repository';

export class GetTagsQuery {
  constructor(public readonly filter: string) {}
}

@QueryHandler(GetTagsQuery)
export class GetTagsHandler implements IQueryHandler<GetTagsQuery> {
  constructor(private readonly knowledgeRepository: KnowledgeRepository) {}

  async execute(query: GetTagsQuery) {
    const filter = query.filter;

    const tags = await this.knowledgeRepository.getFilteredTags(filter);
    return { tags };
  }
}
