import {
  RTKQueryIdentityApi,
  RTKQueryNotificationApi,
  RTKQueryWalletApi,
} from '@/redux/RTKQuery';
import {
  FullResponse,
  LoginRequest,
  LoginResponse,
  SignUpResponse,
  UserResponse,
  WalletResponse,
} from './types';

const authRTKQueryApi = RTKQueryIdentityApi.injectEndpoints({
  endpoints: builder => ({
    signUpUser: builder.mutation({
      query: (body: {}) => ({
        url: '/signup',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<SignUpResponse>) => response,
    }),
    loginUser: builder.mutation({
      query: (body: LoginRequest) => ({
        url: '/login',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<LoginResponse>) => response,
    }),
  }),
  overrideExisting: true,
});
const walletRTKQueryApi = RTKQueryWalletApi.injectEndpoints({
  endpoints: builder => ({
    getUserWallets: builder.mutation({
      query: () => ({
        url: '/getUserWallets',
        method: 'GET',
      }),
      transformResponse: (response: FullResponse<WalletResponse[]>) =>
        response.data,
    }),
    importWallet: builder.mutation({
      query: (body: {mnemonic: string}) => ({
        url: '/importWallet',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<any>) => response.data,
    }),
  }),
  overrideExisting: true,
});

export const {useSignUpUserMutation, useLoginUserMutation} = authRTKQueryApi;
export const {useGetUserWalletsMutation} = walletRTKQueryApi;
