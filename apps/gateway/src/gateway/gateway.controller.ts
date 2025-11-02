import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { catchError, Observable } from 'rxjs';
import { ERROR_EXEPTION, RegistrationDto } from '@home-servers/shared';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('registration')
  registration(
    @Body(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: () => {
          throw new HttpException(
            ERROR_EXEPTION.VALIDATION_REG,
            HttpStatus.BAD_REQUEST
          );
        },
      })
    )
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
}
