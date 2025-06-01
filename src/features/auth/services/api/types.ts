import {UserResponse} from '../../redux/RTKQuery/types';

export interface AccessInfoResponse {
  access_token?: string;
  refresh_token?: string;
  exp?: string;
  // refreshTokenExpiredDate?: string;
  // subscriptionKey?: string;
  // roles?: string;
}

export interface LoginUserApiParams {
  email?: string;
  password?: string;
  user_id?: string;
  payload?: string;
  signature?: string;
}

export interface SignUpUserApiParams {
  email: string;
  password: string;
  username: string;
  biometricPublicKey?: string;
  callback?: () => void;
}
export interface ImportWalletApiParams {
  password: string;
  mnemonic: string;
}

export interface RegisterNotiTokenApi {
  FCMToken: string;
}
export interface UploadMediaResponse extends UserResponse {}
export interface UploadAvatarApiParams {
  params: FormData;
  callback?: () => void;
}
