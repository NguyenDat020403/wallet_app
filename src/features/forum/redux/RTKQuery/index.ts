import {FullResponse} from '@/redux/RTKQuery/types';
import {RTKQueryPostApi} from '@/redux/RTKQuery';
import {Comment, CreatePostResponse, ListResponse, Post} from './types';
import {showToastMessage} from '@/functions';

const postRTKQueryApi = RTKQueryPostApi.injectEndpoints({
  endpoints: builder => ({
    getPost: builder.mutation({
      query: (params: {userId: string; postId: string}) => ({
        url: '',
        method: 'GET',
        params,
      }),
      transformResponse: (response: FullResponse<Post>) => response.data,
    }),
    getListPost: builder.mutation({
      query: (params: {page: number; limit: number}) => ({
        url: '/getPosts',
        method: 'GET',
        params,
      }),
      transformResponse: (response: FullResponse<ListResponse<Post>>) =>
        response.data?.data,
    }),
    likePost: builder.mutation({
      query: (body: {post_id: string}) => ({
        url: '/likePost',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<any>) => {
        if (response.error === '1') {
          showToastMessage('Error');
        }
      },
    }),
    likeComment: builder.mutation({
      query: (body: {comment_id: string}) => ({
        url: '/likeComment',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<any>) => {
        if (response.error === '1') {
          showToastMessage('Error');
        }
      },
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
    commentPost: builder.mutation({
      query: (body: {post_id: string; content: string}) => ({
        url: '/comment',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: FullResponse<Comment>) => response.data,
    }),
    deletePost: builder.mutation({
      query: (body: {post_id: string}) => ({
        url: '/deletePost',
        method: 'PATCH',
        body: body,
      }),
      transformResponse: (response: FullResponse<any>) => {
        if (response.error === '1') {
          showToastMessage(response.message);
        }
      },
    }),
  }),
  overrideExisting: true,
});
export const {
  useGetPostMutation,
  useGetListPostMutation,
  useGetCommentsPostMutation,
  useCreatePostMutation,
  useLikePostMutation,
  useLikeCommentMutation,
  useCommentPostMutation,
  useDeletePostMutation,
} = postRTKQueryApi;
