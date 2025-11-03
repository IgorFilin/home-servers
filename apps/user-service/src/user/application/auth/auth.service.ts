import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    readonly jwtService: JwtService,
    readonly configService: ConfigService
  ) {}

  public getTokenPair(userName: string) {
    //     {
    //   "sub": "a1b2c3d4-...",   // ← UUID пользователя (не email!)
    //   "iat": 1762196426,
    //   "exp": 1762198226,
    //   "jti": "x5y6z7..."       // ← уникальный ID токена (для чёрного списка или инвалидации)
    // }
    const accessToken = this.jwtService.sign(
      {
        name: userName,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '30m',
      }
    );

    const refreshToken = this.jwtService.sign(
      {
        name: userName,
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
