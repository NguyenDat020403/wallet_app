import {apiIdentity} from '@/services/api';
import {LoginUserApiParams, SignUpUserApiParams} from './types';
import {AUTH_API} from '../../constants';

//auth
export const loginUserApi = async (params: LoginUserApiParams) => {
  return await apiIdentity.post(AUTH_API.LOGIN, params).then(res => res.data);
};
export const signupUserApi = async (params: SignUpUserApiParams) => {
  return await apiIdentity.post(AUTH_API.SIGNUP, params).then(res => res.data);
};
//wallet
