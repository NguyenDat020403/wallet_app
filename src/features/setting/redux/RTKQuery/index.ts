import {FullResponse} from '@/redux/RTKQuery/types';
import {RTKQueryNetworkApi} from '@/redux/RTKQuery';
import {NetworkResponse} from './types';

const networkRTKQueryApi = RTKQueryNetworkApi.injectEndpoints({
  endpoints: builder => ({
    getNetworkList: builder.mutation({
      query: () => ({
        url: '/getNetworkList',
        method: 'GET',
      }),
      transformResponse: (response: FullResponse<NetworkResponse[]>) =>
        response.data,
    }),
  }),
  overrideExisting: true,
});

export const {useGetNetworkListMutation} = networkRTKQueryApi;
