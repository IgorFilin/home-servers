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
import { ERROR_EXEPTION } from '../types';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('registration')
  registration(@Body() regBody: RegistrationDto): Observable<any> {
    return this.gatewayService.registration(regBody).pipe(
      catchError((error) => {
        throw new HttpException(
          error.message || ERROR_EXEPTION.REGISTRATION,
          error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      })
    );
  }
}
