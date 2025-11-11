import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AnswerEntity } from '../infrastructure/entities/answer.entity';
import { QuestionEntity } from '../infrastructure/entities/question.entity';
import { ArticleEntity } from '../infrastructure/entities/article.entity';
import { TagsEntity } from '../infrastructure/entities/tags.entity';
import { ViewsEntity } from '../infrastructure/entities/views-article.entity';

export function typeormConfiguration(): TypeOrmModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('BD_HOST'),
      port: configService.get('BD_PORT'),
      username: configService.get('BD_USERNAME'),
      password: configService.get('BD_PASSWORD'),
      database: configService.get('BD_DATABASE'),
      entities: [
        AnswerEntity,
        QuestionEntity,
        ArticleEntity,
        TagsEntity,
        ViewsEntity,
      ],
      synchronize: false,
    }),
    inject: [ConfigService],
  };
}
