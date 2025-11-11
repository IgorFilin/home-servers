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
import { catchError, map, Observable } from 'rxjs';
import {
  ERROR_EXEPTION,
  LoginDto,
  RegistrationDto,
} from '@home-servers/shared';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';
import { UserService } from './services/user/user.service';
import { KnowledgeService } from './services/knowledge/knowledge.service';

@Controller()
export class GatewayController {
  constructor(
    private readonly userService: UserService,
    private readonly knowledgeService: KnowledgeService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserInfo(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.userService.userInfo(userId);
  }

  @Post('registration')
  registration(
    @Body()
    regBody: RegistrationDto
  ): Observable<any> {
    return this.userService.registration(regBody).pipe(
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
    return this.userService.login(loginBody).pipe(
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

    return this.userService.refreshToken(refreshTokenReq).pipe(
      map((responseData) => {
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

  @Post('articles')
  articles(@Req() req: Request, @Res() res: Response): Observable<any> {
    const filter: any = req.query?.filter || 'all';

    return this.knowledgeService.articles(filter).pipe(
      map((responseData) => {
        res.send({
          success: true,
          data: responseData,
        });
      }),
      catchError((error) => {
        throw new HttpException(
          error.message || ERROR_EXEPTION.REGISTRATION,
          error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      })
    );
  }

  @Get('article')
  article(@Req() req: Request, @Res() res: Response): Observable<any> {
    const id: any = req.query?.id || 'all';

    if (!id) {
      throw new HttpException(
        ERROR_EXEPTION.GET_ARTICLES_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return this.knowledgeService.article(id).pipe(
      map((responseData) => {
        res.send({
          success: true,
          data: responseData,
        });
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
