import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtSubParams } from '@home-servers/shared';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    const secret = configService.get('JWT_SECRET');

    if (!secret) {
      throw new Error('Ошибка проверки токена');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(decodeToken: { sub: IJwtSubParams }) {
    return { userId: decodeToken.sub.id };
  }
}
