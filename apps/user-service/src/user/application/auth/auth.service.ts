import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IGenerateJwtParams } from '../../models';
import { IJwtSubParams, IResponseGenerateTokens } from '@home-servers/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public getTokenPair(
    generateData: IGenerateJwtParams
  ): IResponseGenerateTokens {
    const accessToken = this.jwtService.sign(
      {
        sub: {
          id: generateData.id,
          email: generateData.email,
          deviceId: generateData.deviceId,
        } as IJwtSubParams,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '30m',
      }
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: {
          id: generateData.id,
          email: generateData.email,
          deviceId: generateData.deviceId,
        } as IJwtSubParams,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '7d',
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
