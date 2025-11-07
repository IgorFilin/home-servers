import { ERROR_EXEPTION, LoginDto } from '@home-servers/shared';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { AuthService } from '../../application/auth/auth.service';
import { RpcException } from '@nestjs/microservices';
import { IGenerateJwtParams, IJwtSavedParams } from '../../models';
import { TokenRepository } from '../../infrastructure/repository/token.repository';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class LoginCommand {
  constructor(readonly userData: LoginDto) {}
}

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    readonly userRepository: UserRepository,
    private authService: AuthService,
    private tokenRepository: TokenRepository
  ) {}

  async execute(command: LoginCommand) {
    const { email, password, deviceId } = command.userData;

    const user = await this.userRepository.findUser({ email });

    const isUserPasswordValid = await compare(password, user.password);

    if (!user || !isUserPasswordValid) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ERROR_EXEPTION.NOT_EXIST_USER,
      });
    }

    const generateJwtParams: IGenerateJwtParams = {
      id: user.id,
      deviceId,
      email,
    };

    await this.tokenRepository.delete(user.id, deviceId);

    const tokens = this.authService.getTokenPair(generateJwtParams);

    const salt = await genSalt(10);

    const hashedToken = await hash(tokens.refreshToken, salt);

    const savedJwtRefresh: IJwtSavedParams = {
      userId: user.id,
      hashedToken: hashedToken,
      deviceId,
      user,
    };
    await this.tokenRepository.createToken(savedJwtRefresh);

    return {
      success: true,
      data: {
        tokens,
      },
    };
  }
}
