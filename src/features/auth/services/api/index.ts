import {apiIdentity} from '@/services/api';
import {LoginUserApiParams} from './types';
import {AUTH_API} from '../../constants';

export const loginUserApi = async (params: LoginUserApiParams) => {
  return await apiIdentity.post(AUTH_API.LOGIN, params);
};
