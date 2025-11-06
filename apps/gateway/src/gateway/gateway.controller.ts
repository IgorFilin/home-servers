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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserInfo(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.gatewayService.userInfo(userId);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('test')
  // test() {
  //   return this.gatewayService.test();
  // }
}
