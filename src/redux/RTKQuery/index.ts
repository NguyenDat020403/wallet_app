import tokenService from '@/features/auth/services/tokenService';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

const baseQueryWithReAuth =
  (
    url: string,
  ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: url,
      prepareHeaders: async headers => {
        const accessToken = tokenService.getLocalAccessToken();
        if (accessToken) {
          headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
      },
    });
    let result = await baseQuery(args, api, extraOptions);
    return result;
  };

export const RTKQueryIdentityApi = createApi({
  reducerPath: 'RTKQueryIdentityApi',
  baseQuery: baseQueryWithReAuth('http://10.0.2.2:3333/auth'),
  endpoints: builder => ({}),
});

export const RTKQueryWalletApi = createApi({
  reducerPath: 'RTKQueryWalletApi',
  baseQuery: baseQueryWithReAuth('http://10.0.2.2:3333/wallets'),
  endpoints: builder => ({}),
});

export const RTKQueryNetworkApi = createApi({
  reducerPath: 'RTKQueryNetworkApi',
  baseQuery: baseQueryWithReAuth('http://10.0.2.2:3333/networks'),
  endpoints: builder => ({}),
});
