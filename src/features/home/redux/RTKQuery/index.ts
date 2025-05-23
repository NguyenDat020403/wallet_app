import {FullResponse} from '@/redux/RTKQuery/types';
import {
  RTKQueryNetworkApi,
  RTKQueryNotificationApi,
  RTKQueryTransactionApi,
  RTKQueryWalletApi,
} from '@/redux/RTKQuery';
import {
  createTransactionBTCRequest,
  createTransactionEVMRequest,
  DetailWalletResponse,
  GasEstimateRequest,
  GasEstimatesResponse,
  getTransactionHistoryRequest,
  TransactionHistory,
  WalletResponse,
} from './types';
import {showToastMessage} from '@/functions';
import {UserResponse} from '@/features/auth/redux/RTKQuery/types';

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
      transformResponse: (response: FullResponse<GasEstimatesResponse>) => {
        if (response.message === 'fail') {
          showToastMessage('you`re poor');
        }

        return response.data;
      },
    }),
    createTransactionBTC: builder.mutation({
      query: (body: createTransactionBTCRequest) => ({
        url: '/createTransactionBTC',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<string>) => response.data,
    }),
    createTransactionEVM: builder.mutation({
      query: (body: createTransactionEVMRequest) => ({
        url: '/sendTransactionEVM',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<string>) => response.data,
    }),
    getTransactionHistory: builder.mutation({
      query: (body: getTransactionHistoryRequest) => ({
        url: '/getTransactionHistory',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<TransactionHistory>) =>
        response.data,
    }),
    getSendTransactionToAddressHistory: builder.mutation({
      query: (body: {address: string}) => ({
        url: '/getSendTransactionToAddressHistory',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<string[]>) => response.data,
    }),
  }),
  overrideExisting: true,
});
const notificationRTKQueryApi = RTKQueryNotificationApi.injectEndpoints({
  endpoints: builder => ({
    registerTokenNotification: builder.mutation({
      query: (body: {FCMToken: string}) => ({
        url: '/registerNotiToken',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<UserResponse>) =>
        response.data,
    }),
  }),
  overrideExisting: true,
});
export const {useRegisterTokenNotificationMutation} = notificationRTKQueryApi;
export const {useGetWalletMutation, useGetUserWalletsMutation} =
  walletRTKQueryApi;
export const {
  useGetEstimateGasMutation,
  useCreateTransactionBTCMutation,
  useGetTransactionHistoryMutation,
  useCreateTransactionEVMMutation,
  useGetSendTransactionToAddressHistoryMutation,
} = transactionRTKQueryApi;
