import {RTKQueryIdentityApi, RTKQueryWalletApi} from '@/redux/RTKQuery';
import {FullResponse, SignUpResponse, WalletResponse} from './types';

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
export const {useSignUpUserMutation} = authRTKQueryApi;
export const {useGetWalletDefaultMutation} = walletRTKQueryApi;
