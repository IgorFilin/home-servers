export interface IJwtSubParams {
  id: string;
  email: string;
  deviceId: string;
}
export interface IResponseGenerateTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IDecodeToken {
  sub: IJwtSubParams;
  ext: string;
  iat: string;
}
