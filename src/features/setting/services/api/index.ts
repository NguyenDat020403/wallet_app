import {apiNetwork} from '@/services/api';
import {FullResponse} from '@/redux/RTKQuery/types';
import {CreateNetworkRequest} from '../../redux/RTKQuery/types';
import {SETTING_API} from '../../constants';

//network
export const createNetwork = async (params: CreateNetworkRequest) => {
  return await apiNetwork
    .post(SETTING_API.CREATE_NETWORK, params)
    .then(res => res.data);
};
