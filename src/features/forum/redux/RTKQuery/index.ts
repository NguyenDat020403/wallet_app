import {FullResponse} from '@/redux/RTKQuery/types';
import {RTKQueryPostApi} from '@/redux/RTKQuery';
import {ListPostResponse} from './types';

const postRTKQueryApi = RTKQueryPostApi.injectEndpoints({
  endpoints: builder => ({
    getListPost: builder.mutation({
      query: (params: {page: number; limit: number}) => ({
        url: '/getPosts',
        method: 'GET',
        params,
      }),
      transformResponse: (response: FullResponse<ListPostResponse>) =>
        response.data?.data,
    }),
  }),
  overrideExisting: true,
});
export const {useGetListPostMutation} = postRTKQueryApi;
