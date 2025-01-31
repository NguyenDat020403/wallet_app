import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {PROFILE_API} from '../../constants';
import {navigate} from '@/navigation/RootNavigation';

const baseQueryWithReAuth =
  (
    url: string,
  ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: url,
    });
    let result = await baseQuery(args, api, extraOptions);
    return result;
  };

export const RTKQueryIdentityApi = createApi({
  reducerPath: 'RTKQueryIdentityApi',
  baseQuery: baseQueryWithReAuth('http://10.0.2.2:5105/auth'),
  endpoints: builder => ({}),
});
// http://10.0.2.2:5105
const authRTKQueryApi = RTKQueryIdentityApi.injectEndpoints({
  endpoints: builder => ({
    loginUser: builder.query({
      query: (body: {email: string; password: string}) => ({
        url: PROFILE_API.LOGIN_USER,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response,
    }),
  }),
  overrideExisting: true,
});

export const {useLazyLoginUserQuery} = authRTKQueryApi;
