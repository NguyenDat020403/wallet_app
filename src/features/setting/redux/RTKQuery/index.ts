import {FullResponse} from '@/redux/RTKQuery/types';
import {RTKQueryNetworkApi} from '@/redux/RTKQuery';
import {CreateNetworkRequest, NetworkResponse} from './types';
import {showToastMessage} from '@/functions';

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
    createNetwork: builder.mutation({
      query: (body: CreateNetworkRequest) => ({
        url: '/create',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<NetworkResponse>) => {
        if (response.data) {
          showToastMessage(response.message);
          console.log('loi');
        } else {
          return response.data;
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {useGetNetworkListMutation, useCreateNetworkMutation} =
  networkRTKQueryApi;
