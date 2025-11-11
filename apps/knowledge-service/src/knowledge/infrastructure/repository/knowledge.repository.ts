import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ArticleEntity } from '../entities/article.entity';

@Injectable()
export class KnowledgeRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleModel: Repository<ArticleEntity>
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
}
