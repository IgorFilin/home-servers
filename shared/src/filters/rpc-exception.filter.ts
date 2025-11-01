import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError();
    const enrichedError = {
      error,
      timestamp: new Date().toISOString(),
    };

    throw new RpcException(enrichedError);
  }
}
