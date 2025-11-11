import { Module } from '@nestjs/common';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfiguration, typeormConfiguration } from './configuration';
import { AnswerEntity } from './entities/answer.entity';
import { QuestionEntity } from './entities/question.entity';
import { ArticleEntity } from './entities/article.entity';
import { TagsEntity } from './entities/tags.entity';
import { ViewsEntity } from './entities/views-article.entity';

@Module({
  imports: [
    ConfigModule.forRoot(envConfiguration()),
    TypeOrmModule.forRootAsync(typeormConfiguration()),
    TypeOrmModule.forFeature([
      AnswerEntity,
      QuestionEntity,
      ArticleEntity,
      TagsEntity,
      ViewsEntity,
    ]),
  ],
  controllers: [KnowledgeController],
  providers: [KnowledgeService],
})
export class KnowledgeModule {}
