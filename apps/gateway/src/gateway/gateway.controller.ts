import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { catchError, map, Observable } from 'rxjs';
import {
  ERROR_EXEPTION,
  LoginDto,
  RegistrationDto,
} from '@home-servers/shared';
import { Response } from 'express';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('registration')
  registration(
    @Body()
    regBody: RegistrationDto
  ): Observable<any> {
    return this.gatewayService.registration(regBody).pipe(
      catchError((error) => {
        throw new HttpException(
          error.message || ERROR_EXEPTION.REGISTRATION,
          error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      })
    );
  }

  @Post('login')
  login(
    @Body()
    loginBody: LoginDto,
    @Res() res: Response
  ): Observable<any> {
    return this.gatewayService.login(loginBody).pipe(
      map((data) => {
        const { refreshToken, accessToken } = data;
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: false,
          expires,
        });
        res.send({ accessToken });
      }),
      catchError((error) => {
        throw new HttpException(
          error.message || ERROR_EXEPTION.REGISTRATION,
          error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      })
    );
  }
}
