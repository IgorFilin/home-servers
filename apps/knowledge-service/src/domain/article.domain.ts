import { CreateArticleDto } from '@home-servers/shared';
import { ArticleEntity } from '../knowledge/infrastructure/entities/article.entity';

export class ArticleDomain {
  private title: string;
  private description: string;
  private userId: string;

  static async create(createArticleDTO: CreateArticleDto, userId: string) {
    const article = new ArticleDomain();

    article.title = createArticleDTO.title;
    article.description = createArticleDTO.text;
    article.userId = userId;

    return article;
  }

  getPlainObjectData(): Partial<ArticleEntity> {
    return {
      title: this.title,
      description: this.description,
      userId: this.userId,
    };
  }
}
