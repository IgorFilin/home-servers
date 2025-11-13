import { Module } from '@nestjs/common';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfiguration, typeormConfiguration } from './configuration';
import { AnswerEntity } from './infrastructure/entities/answer.entity';
import { QuestionEntity } from './infrastructure/entities/question.entity';
import { ArticleEntity } from './infrastructure/entities/article.entity';
import { TagsEntity } from './infrastructure/entities/tags.entity';
import { ViewsEntity } from './infrastructure/entities/views-article.entity';
import { KnowledgeRepository } from './infrastructure/repository/knowledge.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfiguration } from './configuration/jwt.config';
import { CqrsModule } from '@nestjs/cqrs';
import { GetArticleHandler } from './use-cases/query/get-article.use-case';
import { GetTagsHandler } from './use-cases/query/get-tags.use-case';

@Module({
  imports: [
    ConfigModule.forRoot(envConfiguration()),
    TypeOrmModule.forRootAsync(typeormConfiguration()),
    JwtModule.registerAsync(jwtConfiguration()),
    TypeOrmModule.forFeature([
      AnswerEntity,
      QuestionEntity,
      ArticleEntity,
      TagsEntity,
      ViewsEntity,
    ]),
    CqrsModule.forRoot(),
  ],
  controllers: [KnowledgeController],
  providers: [
    KnowledgeService,
    KnowledgeService,
    KnowledgeRepository,
    GetArticleHandler,
    GetTagsHandler,
  ],
})
export class KnowledgeModule {}
