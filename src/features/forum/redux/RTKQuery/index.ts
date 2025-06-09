import {FullResponse} from '@/redux/RTKQuery/types';
import {RTKQueryPostApi} from '@/redux/RTKQuery';
import {Comment, CreatePostResponse, ListResponse, Post} from './types';

const postRTKQueryApi = RTKQueryPostApi.injectEndpoints({
  endpoints: builder => ({
    getListPost: builder.mutation({
      query: (params: {page: number; limit: number}) => ({
        url: '/getPosts',
        method: 'GET',
        params,
      }),
      transformResponse: (response: FullResponse<ListResponse<Post>>) =>
        response.data?.data,
    }),
    getCommentsPost: builder.mutation({
      query: (params: {postId: string; page?: number; limit?: number}) => ({
        url: `/${params.postId}/comments`,
        method: 'GET',
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
        },
      }),
      transformResponse: (response: FullResponse<ListResponse<Comment>>) =>
        response.data?.data,
    }),
    createPost: builder.mutation<any, FormData>({
      query: formData => ({
        url: '/create',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: FullResponse<CreatePostResponse>) =>
        response.data,
    }),
  }),
  overrideExisting: true,
});
export const {
  useGetListPostMutation,
  useGetCommentsPostMutation,
  useCreatePostMutation,
} = postRTKQueryApi;
