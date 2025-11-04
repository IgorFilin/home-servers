export interface IGenerateJwtParams {
  id: string;
  email: string;
}

export interface IResponseJwtTokens {
  tokens: IResponseGenerateTokens;
}

export interface IResponseGenerateTokens {
  accessToken: string;
  refreshToken: string;
}
