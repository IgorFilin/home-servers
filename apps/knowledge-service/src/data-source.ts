import { DataSource } from 'typeorm';
import { join } from 'path';
import { AnswerEntity } from './knowledge/infrastructure/entities/answer.entity';
import { QuestionEntity } from './knowledge/infrastructure/entities/question.entity';
import { ArticleEntity } from './knowledge/infrastructure/entities/article.entity';
import { TagsEntity } from './knowledge/infrastructure/entities/tags.entity';
import { ViewsEntity } from './knowledge/infrastructure/entities/views-article.entity';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.BD_HOST,
  port: Number(process.env.BD_PORT),
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_DATABASE,
  entities: [
    AnswerEntity,
    QuestionEntity,
    ArticleEntity,
    TagsEntity,
    ViewsEntity,
  ],
  migrations: [join(__dirname, 'migrations/*.ts')],
  synchronize: false,
  migrationsRun: true,
});
