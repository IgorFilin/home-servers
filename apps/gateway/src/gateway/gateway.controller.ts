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
        expires.setDate(expires.getDate() + 2);

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
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
      map((responseData) => {
        console.log('resdata refresh', responseData);
        const responseStatus = responseData.success
          ? HttpStatus.ACCEPTED
          : HttpStatus.UNAUTHORIZED;
        res.status(responseStatus).send(responseData);
      }),
      catchError((error) => {
        throw new HttpException(
          error.message || ERROR_EXEPTION.REGISTRATION,
          error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      })
    );
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response): Observable<any> {
    const refreshTokenReq = req.cookies.refreshToken;

    if (!refreshTokenReq) {
      throw new HttpException(
        ERROR_EXEPTION.REFRESH_TOKEN_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return this.gatewayService.logout(refreshTokenReq).pipe(
      map((responseData) => {
        const isSuccess = responseData.success;
        console.log('isSuccess', isSuccess);
        if (isSuccess) {
          res.clearCookie('refreshToken', {
            httpOnly: true,
            expires: new Date(),
          });
        }
        console.log('res', responseData);
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
}
