import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { catchError, map, Observable } from 'rxjs';
import {
  ERROR_EXEPTION,
  LoginDto,
  RegistrationDto,
} from '@home-servers/shared';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserInfo(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.gatewayService.userInfo(userId);
  }

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
        const { refreshToken, accessToken } = data.data.tokens;
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie('refreshToken', refreshToken, {
          httpOnly: false,
          expires,
        });

        const responseData = {
          success: true,
          data: {
            accessToken,
          },
        };
        res.send(responseData);
      }),
      catchError((error) => {
        throw new HttpException(
          error.message || ERROR_EXEPTION.REGISTRATION,
          error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      })
    );
  }

  @Get('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshTokenReq = req.cookies.refreshToken;

    if (!refreshTokenReq) {
      throw new HttpException(
        ERROR_EXEPTION.REFRESH_TOKEN_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return this.gatewayService.refreshToken(refreshTokenReq).pipe(
      map((data) => {
        const { refreshToken = null, accessToken } = data.data.tokens;

        if (refreshToken) {
          const expires = new Date();
          expires.setDate(expires.getDate() + 7);
          res.cookie('refreshToken', refreshToken, {
            httpOnly: false,
            expires,
          });
        }

        const responseData = {
          success: true,
          data: {
            accessToken,
          },
        };
        res.send(responseData);
      }),
      catchError((error) => {
        throw new HttpException(
          error.message || ERROR_EXEPTION.REGISTRATION,
          error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      })
    );
    // await new Promise((resolve) => setTimeout(() => resolve(true), 4000));
    // return {
    //   success: true,
    //   data: {
    //     accessToken:
    //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTEyNjIzOTAyMiwiZXhwIjoyMjI2MjM5MDIyfQ.YkAjg0sJtIlLjKHVwlLo8gmzGQWLzovfgJfVodpw858',
    //   },
    // };
  }
}
