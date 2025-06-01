import {apiNetwork, apiToken} from '@/services/api';
import {FullResponse} from '@/redux/RTKQuery/types';
import {
  CreateNetworkRequest,
  CreateTokenRequest,
} from '../../redux/RTKQuery/types';
import {SETTING_API} from '../../constants';

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
