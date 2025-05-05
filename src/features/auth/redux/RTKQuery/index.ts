import {RTKQueryIdentityApi, RTKQueryWalletApi} from '@/redux/RTKQuery';
import {
  FullResponse,
  LoginRequest,
  LoginResponse,
  SignUpResponse,
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
    getWalletDefault: builder.mutation({
      query: () => ({
        url: '/getWalletDefault',
        method: 'GET',
      }),
      transformResponse: (response: FullResponse<WalletResponse>) => response,
    }),
  }),
  overrideExisting: true,
});
export const {useSignUpUserMutation, useLoginUserMutation} = authRTKQueryApi;
export const {useGetWalletDefaultMutation} = walletRTKQueryApi;
