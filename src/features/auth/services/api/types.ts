export interface AccessInfoResponse {
  access_token?: string;
  refresh_token?: string;
  exp?: string;
  // refreshTokenExpiredDate?: string;
  // subscriptionKey?: string;
  // roles?: string;
}

export interface LoginUserApiParams {
  email: string;
  password: string;
}
