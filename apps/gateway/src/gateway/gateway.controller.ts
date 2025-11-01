import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { catchError, EMPTY, Observable, tap, timeout } from 'rxjs';
import { RegistrationDto } from '@home-servers/shared';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('registration')
  registration(@Body() regBody: RegistrationDto): Observable<any> {
    return this.gatewayService.registration(regBody).pipe(
      catchError((error) => {
        console.log('В ОШИБКЕ ============================');
        throw new HttpException(
          error.message || 'Registration failed',
          error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      })
    );
  }
}
