import {FullResponse} from '@/redux/RTKQuery/types';
import {
  RTKQueryNetworkApi,
  RTKQueryPostApi,
  RTKQueryUserApi,
  RTKQueryWalletApi,
} from '@/redux/RTKQuery';
import {UserResponse} from '@/features/auth/redux/RTKQuery/types';
import {ListResponse, Post} from '@/features/forum/redux/RTKQuery/types';
import {
  CreateNetworkRequest,
  GetListNetworkResponse,
  Network,
  WalletNetwork,
} from './types';
import {showToastMessage} from '@/functions';

const userRTKQueryApi = RTKQueryUserApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.mutation({
      query: (params: {userId: string}) => ({
        url: '',
        method: 'GET',
        params,
      }),
      transformResponse: (response: FullResponse<UserResponse>) =>
        response.data,
    }),
    update: builder.mutation({
      query: (params: {userId: string}) => ({
        url: '',
        method: 'PATCH',
        params,
      }),
      transformResponse: (response: FullResponse<UserResponse>) =>
        response.data,
    }),
  }),
  overrideExisting: true,
});

const postRTKQueryApi = RTKQueryPostApi.injectEndpoints({
  endpoints: builder => ({
    getUserPosts: builder.mutation({
      query: (params: {page: number; limit: number; userId: string}) => ({
        url: '/getUserPosts',
        method: 'GET',
        params,
      }),
      transformResponse: (response: FullResponse<ListResponse<Post>>) =>
        response.data?.data,
    }),
  }),
  overrideExisting: true,
});

const walletRTKQueryApi = RTKQueryWalletApi.injectEndpoints({
  endpoints: builder => ({
    getUserWalletNetwork: builder.mutation({
      query: (params: {userId: string}) => ({
        url: '/getUserWalletNetwork',
        method: 'GET',
        params,
      }),
      transformResponse: (response: FullResponse<WalletNetwork[]>) =>
        response.data,
    }),
  }),
  overrideExisting: true,
});
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

export const {useGetUserPostsMutation} = postRTKQueryApi;

export const {useGetUserMutation} = userRTKQueryApi;
export const {useGetUserWalletNetworkMutation} = walletRTKQueryApi;
