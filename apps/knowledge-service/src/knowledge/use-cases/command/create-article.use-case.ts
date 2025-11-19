import { CreateArticleDto } from '@home-servers/shared';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KnowledgeRepository } from '../../infrastructure/repository/knowledge.repository';
import { ArticleDomain } from 'apps/knowledge-service/src/domain/article.domain';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CreateArticleCommand {
  constructor(
    readonly createArticlePayload: CreateArticleDto,
    readonly userId: string
  ) {}
}

@CommandHandler(CreateArticleCommand)
export class CreateArticleCommandHandler
  implements ICommandHandler<CreateArticleCommand>
{
  constructor(
    private readonly knowledgeRepository: KnowledgeRepository,
    private jwtService: JwtService
  ) {}

  async execute(command: CreateArticleCommand) {
    const article = await ArticleDomain.create(
      command.createArticlePayload,
      command.userId
    );
    const createdArticle = await this.knowledgeRepository.createArticle(
      article
    );

    return {
      success: true,
      data: {},
    };
  }
}
