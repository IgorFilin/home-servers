import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ArticleEntity } from '../entities/article.entity';
import { TagsEntity } from '../entities/tags.entity';
import { CreateArticleDto } from '@home-servers/shared';
import { ArticleDomain } from 'apps/knowledge-service/src/domain/article.domain';

@Injectable()
export class KnowledgeRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleModel: Repository<ArticleEntity>,
    @InjectRepository(TagsEntity)
    private tagsModel: Repository<TagsEntity>
  ) {}

  async getArticlesForFilter(filter: string) {
    return this.articleModel.find({
      relations: ['tags', 'views'],
    });
  }

  async getArticleById(id: string) {
    return this.articleModel.findOne({
      where: { id },
      relations: ['tags', 'views'],
    });
  }

  async getFilteredTags(filter: string) {
    const searchTerm = filter?.trim();

    if (!searchTerm) {
      return [];
    }

    return this.tagsModel.find({
      where: {
        title: ILike(`%${filter}%`),
      },
    });
  }

  async createArticle(articleDomain: ArticleDomain) {
    console.log('articleDomain', articleDomain);
    const article = this.articleModel.create(
      articleDomain.getPlainObjectData()
    );
    article.views = [];
    article.tags = [];
    console.log('rep article', article);
    return this.articleModel.save(article);
  }
}
