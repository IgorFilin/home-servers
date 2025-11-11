import { Controller } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class KnowledgeController {
  constructor(private readonly appService: KnowledgeService) {}

  @MessagePattern({ cmd: 'articles' })
  async logout() {
    try {
      console.log('asdasdasd');
      return {
        test: 'test',
      };
    } catch (error) {
      if (error instanceof RpcException) throw error;

      // throw new RpcException({
      //   statusCode: 400,
      //   message: ERROR_EXEPTION.REFRESH_TOKEN_ERROR,
      // });
    }
  }
}
