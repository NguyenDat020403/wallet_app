import {
  apiIdentity,
  apiNotification,
  apiUpload,
  apiWallet,
} from '@/services/api';
import {
  LoginUserApiParams,
  RegisterNotiTokenApi,
  SignUpUserApiParams,
  UploadMediaResponse,
} from './types';
import {AUTH_API} from '../../constants';
import {FullResponse} from '../../redux/RTKQuery/types';
import {store} from '@/redux';

//auth
export const loginUserApi = async (params: LoginUserApiParams) => {
  return await apiIdentity.post(AUTH_API.LOGIN, params).then(res => res.data);
};
export const signupUserApi = async (params: SignUpUserApiParams) => {
  return await apiIdentity.post(AUTH_API.SIGNUP, params).then(res => res.data);
};
///Notification
export const registerNotiTokenApi = async (body: RegisterNotiTokenApi) => {
  return await apiNotification
    .post('/registerNotiToken', {body: body})
    .then(res => res.data);
};

//Upload file
export const UploadAvatarApiParams = async (
  params: FormData,
): Promise<FullResponse<UploadMediaResponse>> => {
  return await apiUpload
    .post('/avatar', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${
          store.getState().authReducer.accessInfo.access_token
        }`,
      },
    })
    .then(res => res.data);
};
