import {FullResponse} from '@/redux/RTKQuery/types';
import {
  RTKQueryNetworkApi,
  RTKQueryNotificationApi,
  RTKQueryTokenApi,
  RTKQueryTransactionApi,
  RTKQueryWalletApi,
} from '@/redux/RTKQuery';
import {
  createTransactionBTCRequest,
  createTransactionEVMRequest,
  DetailWalletResponse,
  GasEstimateRequest,
  GasEstimatesResponse,
  getCurrentTransactionRequest,
  getTransactionsHistoryRequest,
  ListWalletToken,
  SendAddressHistoryRequest,
  TokenMarketDataResponse,
  TransactionHistory,
  TransactionHistoryByDate,
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
    updateWalletName: builder.mutation({
      query: (body: {wallet_id: string; wallet_name: string}) => ({
        url: '/update',
        method: 'PATCH',
        body: body,
      }),
      transformResponse: (response: FullResponse<WalletResponse>) =>
        response.data,
    }),
    deleteWalletName: builder.mutation({
      query: (body: {wallet_id: string}) => ({
        url: '/delete',
        method: 'DELETE',
        body: body,
      }),
      transformResponse: (response: FullResponse<WalletResponse>) =>
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
const tokenRTKQueryApi = RTKQueryTokenApi.injectEndpoints({
  endpoints: builder => ({
    getTokenMarketData: builder.mutation({
      query: (body: {symbol: string; name: string}) => ({
        url: '/market',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<TokenMarketDataResponse>) =>
        response.data,
    }),
    getWalletListToken: builder.mutation({
      query: (body: {wallet_id: string}) => ({
        url: '/listWalletToken',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<ListWalletToken[]>) =>
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
        url: '/sendTransactionBTC',
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
    getTransactionsHistory: builder.mutation({
      query: (body: getTransactionsHistoryRequest) => ({
        url: '/getTransactionsHistory',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<TransactionHistoryByDate>) =>
        response.data,
    }),
    getCurrentTransaction: builder.mutation({
      query: (body: getCurrentTransactionRequest) => ({
        url: '/getCurrentTransactionHistory',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<TransactionHistory>) =>
        response.data,
    }),

    getSendTransactionToAddressHistory: builder.mutation({
      query: (body: SendAddressHistoryRequest) => ({
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
export const {useGetTokenMarketDataMutation, useGetWalletListTokenMutation} =
  tokenRTKQueryApi;
export const {
  useGetWalletMutation,
  useGetUserWalletsMutation,
  useUpdateWalletNameMutation,
  useDeleteWalletNameMutation,
} = walletRTKQueryApi;
export const {
  useGetEstimateGasMutation,
  useCreateTransactionBTCMutation,
  useGetTransactionsHistoryMutation,
  useGetCurrentTransactionMutation,
  useCreateTransactionEVMMutation,
  useGetSendTransactionToAddressHistoryMutation,
} = transactionRTKQueryApi;
