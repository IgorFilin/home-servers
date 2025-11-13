import { Controller } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ERROR_EXEPTION } from '@home-servers/shared';

@Controller()
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @MessagePattern({ cmd: 'articles' })
  async articles({ filter }) {
    try {
      const result = await this.knowledgeService.articles(filter);
      return result;
    } catch (error) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: 404,
        message: ERROR_EXEPTION.GET_ARTICLES_ERROR,
      });
    }
  }

  @MessagePattern({ cmd: 'article' })
  async article({ id }) {
    try {
      const result = await this.knowledgeService.article(id);
      return result;
    } catch (error) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: 404,
        message: ERROR_EXEPTION.GET_ARTICLES_ERROR,
      });
    }
  }

  @MessagePattern({ cmd: 'tags' })
  async tags({ filter }) {
    try {
      const result = await this.knowledgeService.tags(filter);
      console.log('result', result);
      return result;
    } catch (error) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: 404,
        message: ERROR_EXEPTION.GET_ARTICLES_ERROR,
      });
    }
  }
}
