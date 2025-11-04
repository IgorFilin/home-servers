import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IGenerateJwtParams, IResponseGenerateTokens } from '../../models';
import { randomUUID } from 'crypto';

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
        },
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
        },
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
