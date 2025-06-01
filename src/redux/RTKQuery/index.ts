import {replace} from '@/navigation/RootNavigation';
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
    if (result.error && result?.error?.status === 401) {
      tokenService.logout();
    }
    return result;
  };

export const RTKQueryIdentityApi = createApi({
  reducerPath: 'RTKQueryIdentityApi',
  baseQuery: baseQueryWithReAuth(Config.API_URL_AUTH),
  endpoints: builder => ({}),
});

export const RTKQueryWalletApi = createApi({
  reducerPath: 'RTKQueryWalletApi',
  baseQuery: baseQueryWithReAuth(Config.API_URL_WALLET),
  endpoints: builder => ({}),
});

export const RTKQueryNetworkApi = createApi({
  reducerPath: 'RTKQueryNetworkApi',
  baseQuery: baseQueryWithReAuth(Config.API_URL_NETWORK),
  endpoints: builder => ({}),
});
export const RTKQueryTokenApi = createApi({
  reducerPath: 'RTKQueryTokenApi',
  baseQuery: baseQueryWithReAuth(Config.API_URL_TOKEN),
  endpoints: builder => ({}),
});

export const RTKQueryTransactionApi = createApi({
  reducerPath: 'RTKQueryTransactionApi',
  baseQuery: baseQueryWithReAuth(Config.API_URL_TRANSACTION),
  endpoints: builder => ({}),
});
export const RTKQueryNotificationApi = createApi({
  reducerPath: 'RTKQueryNotificationApi',
  baseQuery: baseQueryWithReAuth(Config.API_URL_NOTIFICATION),
  endpoints: builder => ({}),
});

export const RTKQueryPostApi = createApi({
  reducerPath: 'RTKQueryPostApi',
  baseQuery: baseQueryWithReAuth(Config.API_URL_POST),
  endpoints: builder => ({}),
});
