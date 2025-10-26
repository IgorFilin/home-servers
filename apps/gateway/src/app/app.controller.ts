import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { IUser } from '@home-servers/shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create_user')
  getUser(@Body() user: IUser): Observable<any> {
    return this.appService.getUser(user).pipe(
      catchError((err) => {
        return EMPTY;
      })
    );
  }
}
