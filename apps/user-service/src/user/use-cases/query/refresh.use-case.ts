import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TokenRepository } from '../../infrastructure/repository/token.repository';
import { IJwtFindParams } from '../../models';
import { AuthService } from '../../application/auth/auth.service';
import { compare } from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { ERROR_EXEPTION } from '@home-servers/shared';
import { access } from 'fs';

export class RefreshQuery {
  constructor(public readonly refreshToken: string) {}
}

@QueryHandler(RefreshQuery)
export class RefreshQueryHandler implements IQueryHandler<RefreshQuery> {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly authService: AuthService
  ) {}

  async execute(query: RefreshQuery) {
    const refreshToken = query.refreshToken;

    const decodeToken = this.authService.decodeToken(refreshToken);

    const findParams: IJwtFindParams = {
      userId: decodeToken.sub.id,
      deviceId: decodeToken.sub.deviceId,
    };

    const { hashedToken } = await this.tokenRepository.findToken(findParams);

    const isValidToken = await compare(refreshToken, hashedToken);

    if (!isValidToken) {
      throw new RpcException({
        statusCode: 400,
        message: ERROR_EXEPTION.REFRESH_TOKEN_ERROR,
      });
    }

    const isValidExpDate =
      this.authService.checkValidDateExpToken(refreshToken);

    const responseBody = {};

    if (!isValidExpDate) {
    } else {
      return {
        accessToken: this.authService.createToken({
          userId: decodeToken.sub.id,
          deviceId: decodeToken.sub.deviceId,
        }),
      };
    }

    console.log('hashedToken', hashedToken);
    return { accessToken: '...' };
  }
}
