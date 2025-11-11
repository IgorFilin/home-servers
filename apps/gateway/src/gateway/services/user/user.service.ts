import { LoginDto, RegistrationDto, USER_SERVICE } from '@home-servers/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { defaultIfEmpty, Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy
  ) {}

  registration(userData: RegistrationDto): Observable<any> {
    return this.userService
      .send({ cmd: 'registration' }, userData)
      .pipe(defaultIfEmpty(null));
  }

  login(userData: LoginDto): Observable<any> {
    return this.userService
      .send({ cmd: 'login' }, userData)
      .pipe(defaultIfEmpty(null));
  }

  userInfo(userId: string): Observable<any> {
    return this.userService
      .send({ cmd: 'userInfo' }, { userId })
      .pipe(defaultIfEmpty(null));
  }

  refreshToken(refreshToken: string) {
    return this.userService
      .send({ cmd: 'refreshToken' }, { refreshToken })
      .pipe(defaultIfEmpty(null));
  }

  logout(refreshToken: string) {
    return this.userService
      .send({ cmd: 'logout' }, { refreshToken })
      .pipe(defaultIfEmpty(null));
  }
}
