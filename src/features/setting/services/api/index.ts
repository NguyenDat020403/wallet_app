import {apiNetwork, apiToken, apiUser} from '@/services/api';
import {FullResponse} from '@/redux/RTKQuery/types';
import {
  CreateNetworkRequest,
  CreateTokenRequest,
} from '../../redux/RTKQuery/types';
import {SETTING_API} from '../../constants';
import {UpdateUserApiParams} from '../../redux/saga/types';
import tokenService from '@/features/auth/services/tokenService';
import {UserResponse} from '@/features/auth/redux/RTKQuery/types';

//network
export const createNetwork = async (params: CreateNetworkRequest) => {
  return await apiNetwork
    .post(SETTING_API.CREATE_NETWORK, params)
    .then(res => res.data);
};

//token
export const createToken = async (params: CreateTokenRequest) => {
  return await apiToken
    .post(SETTING_API.CREATE_TOKEN, params)
    .then(res => res.data);
};

//user
export const update = async (params: UpdateUserApiParams) => {
  console.log('udpae', params);
  const accessToken = tokenService.getLocalAccessToken();
  const formData = new FormData();
  formData.append('username', params.username);
  if (params.bio) {
    formData.append('bio', params.bio);
  }

  if (params.file) {
    formData.append('file', {
      uri: params.file.uri,
      type: params.file.type,
      name: params.file.name,
    } as any);
  }

  return await apiUser
    .patch(SETTING_API.UPDATE_USER, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.data);
};
