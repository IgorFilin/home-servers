import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TokenRepository } from '../../infrastructure/repository/token.repository';
import { IJwtFindParams } from '../../models';
import { AuthService } from '../../application/auth/auth.service';
import { compare } from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { ERROR_EXEPTION } from '@home-servers/shared';

export class RefreshQuery {
  constructor(public readonly refreshToken: string) {}
}

@QueryHandler(RefreshQuery)
export class RefreshQueryHandler implements IQueryHandler<RefreshQuery> {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly authService: AuthService
  ) {}

  private async invalidateTokenAndReturnError(
    userId: string,
    deviceId: string
  ) {
    await this.tokenRepository.delete(userId, deviceId);
    return {
      success: false,
      data: null,
    };
  }

  async execute(query: RefreshQuery) {
    const refreshToken = query.refreshToken;

    const { sub = null } = this.authService.decodeToken(refreshToken);

    const isValidExpDate = this.authService.checkVerifyToken(refreshToken);

    if (!isValidExpDate) {
      this.invalidateTokenAndReturnError(sub.id, sub.deviceId);
    }

    const findParams: IJwtFindParams = {
      userId: sub?.id,
      deviceId: sub?.deviceId,
    };

    const { hashedToken = null } = await this.tokenRepository.findToken(
      findParams
    );

    if (!hashedToken) {
      this.invalidateTokenAndReturnError(sub.id, sub.deviceId);
    }

    const isValidToken = await compare(refreshToken, hashedToken);

    if (!isValidToken) {
      this.invalidateTokenAndReturnError(sub.id, sub.deviceId);
    }

    return {
      success: true,
      data: {
        tokens: {
          accessToken: this.authService.createToken(
            {
              id: sub?.id,
              deviceId: sub?.deviceId,
            },
            '30m'
          ),
        },
      },
    };
  }
}
