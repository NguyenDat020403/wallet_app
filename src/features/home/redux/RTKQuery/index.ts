import {FullResponse} from '@/redux/RTKQuery/types';
import {
  RTKQueryNetworkApi,
  RTKQueryTransactionApi,
  RTKQueryWalletApi,
} from '@/redux/RTKQuery';
import {
  DetailWalletResponse,
  GasEstimateRequest,
  GasEstimatesResponse,
  WalletResponse,
} from './types';

const walletRTKQueryApi = RTKQueryWalletApi.injectEndpoints({
  endpoints: builder => ({
    getWallet: builder.mutation({
      query: (body: {wallet_id: string}) => ({
        url: '/getWallet',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<DetailWalletResponse>) =>
        response.data,
    }),
    getUserWallets: builder.mutation({
      query: () => ({
        url: '/getUserWallets',
        method: 'GET',
      }),
      transformResponse: (response: FullResponse<WalletResponse[]>) =>
        response.data,
    }),
  }),
  overrideExisting: true,
});

const networkRTKQueryApi = RTKQueryNetworkApi.injectEndpoints({
  endpoints: builder => ({
    getWallet: builder.mutation({
      query: (body: {wallet_id: string}) => ({
        url: '/getWallet',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<DetailWalletResponse>) =>
        response.data,
    }),
  }),
  overrideExisting: true,
});

const transactionRTKQueryApi = RTKQueryTransactionApi.injectEndpoints({
  endpoints: builder => ({
    getEstimateGas: builder.mutation({
      query: (body: GasEstimateRequest) => ({
        url: '/getEstimateGas',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<GasEstimatesResponse>) =>
        response.data,
    }),
  }),
  overrideExisting: true,
});

export const {useGetWalletMutation, useGetUserWalletsMutation} =
  walletRTKQueryApi;
export const {useGetEstimateGasMutation} = transactionRTKQueryApi;
