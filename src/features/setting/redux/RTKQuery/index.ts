import {FullResponse} from '@/redux/RTKQuery/types';
import {RTKQueryNetworkApi} from '@/redux/RTKQuery';
import {CreateNetworkRequest, GetListNetworkResponse, Network} from './types';
import {showToastMessage} from '@/functions';

const networkRTKQueryApi = RTKQueryNetworkApi.injectEndpoints({
  endpoints: builder => ({
    getNetworkList: builder.mutation({
      query: (params: {wallet_id: string}) => ({
        url: '/getNetworkList' + `/${params.wallet_id}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: FullResponse<GetListNetworkResponse[]>) =>
        response.data,
    }),
    createNetwork: builder.mutation({
      query: (body: CreateNetworkRequest) => ({
        url: '/create',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<Network>) => {
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
