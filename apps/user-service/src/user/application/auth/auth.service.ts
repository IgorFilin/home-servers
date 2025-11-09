import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IGenerateJwtParams } from '../../models';
import { IJwtSubParams, IResponseGenerateTokens } from '@home-servers/shared';
import type { StringValue } from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  checkVerifyToken(refreshToken: string): boolean {
    const isVerify = this.jwtService.verify(refreshToken);
    return !!isVerify;
  }

  decodeToken(token: string): Record<string, string> & { sub: IJwtSubParams } {
    return this.jwtService.decode(token);
  }

  createToken(generateData: IGenerateJwtParams, timeExt: number | StringValue) {
    return this.jwtService.sign(
      {
        sub: {
          id: generateData.id,
          deviceId: generateData.deviceId,
        } as IJwtSubParams,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: timeExt,
      }
    );
  }

  public getTokenPair(
    generateData: IGenerateJwtParams
  ): IResponseGenerateTokens {
    const accessToken = this.createToken(generateData, '30m');
    const refreshToken = this.createToken(generateData, '2d');
    console.log('refreshToken', refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }
}
