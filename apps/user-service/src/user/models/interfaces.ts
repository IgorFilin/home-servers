import { UserEntity } from '../infrastructure/entities/user.entity';

export interface IGenerateJwtParams {
  id: string;
  email: string;
  deviceId: string;
}

export interface IResponseJwtTokens {
  tokens: IResponseGenerateTokens;
}

export interface IResponseGenerateTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IJwtSavedParams {
  userId: string;
  hashedToken: string;
  user: UserEntity;
  deviceId: string;
}
