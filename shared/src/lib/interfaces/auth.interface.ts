export interface IJwtSubParams {
  id: string;
  email: string;
  deviceId: string;
}
export interface IResponseGenerateTokens {
  accessToken: string;
  refreshToken: string;
}
