import { IResponseGenerateTokens } from '@home-servers/shared';
import { UserEntity } from '../infrastructure/entities/user.entity';

export interface IGenerateJwtParams {
  id: string;
  email: string;
  deviceId: string;
}

export interface IResponseJwtTokens {
  tokens: IResponseGenerateTokens;
}
export interface IJwtSavedParams {
  userId: string;
  hashedToken: string;
  user: UserEntity;
  deviceId: string;
}

export interface IJwtFindParams {
  userId: string;
  deviceId: string;
}
