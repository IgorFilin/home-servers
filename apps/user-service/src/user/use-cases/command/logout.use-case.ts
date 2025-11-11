import { ERROR_EXEPTION } from '@home-servers/shared';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { AuthService } from '../../application/auth/auth.service';
import { RpcException } from '@nestjs/microservices';
import { TokenRepository } from '../../infrastructure/repository/token.repository';

@Injectable()
export class LogoutCommand {
  constructor(readonly refreshToken: string) {}
}

@CommandHandler(LogoutCommand)
export class LogoutCommandHandler implements ICommandHandler<LogoutCommand> {
  constructor(
    readonly userRepository: UserRepository,
    private authService: AuthService,
    private tokenRepository: TokenRepository
  ) {}

  async execute(command: LogoutCommand) {
    const decodeToken = this.authService.decodeToken(command.refreshToken);

    const findedToken = await this.tokenRepository.findToken({
      userId: decodeToken.sub?.id,
      deviceId: decodeToken.sub?.deviceId,
    });

    if (!findedToken) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ERROR_EXEPTION.LOGOUT,
      });
    }

    await this.tokenRepository.delete(findedToken.userId, findedToken.deviceId);

    return {
      success: true,
      data: {},
    };
  }
}
