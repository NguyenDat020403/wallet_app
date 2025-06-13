import {FullResponse} from '@/redux/RTKQuery/types';
import {RTKQueryMessageApi} from '@/redux/RTKQuery';
import {ChatDetailResponse, ItemChatResponse, Message} from './types';

const chatRTKQueryApi = RTKQueryMessageApi.injectEndpoints({
  endpoints: builder => ({
    sendMessage: builder.mutation({
      query: (body: {
        sender_id: string;
        receiver_id: string;
        content: string;
      }) => ({
        url: 'create',
        method: 'POST',
        body,
      }),
      transformResponse: (response: FullResponse<Message>) => response.data,
    }),
    getUserChats: builder.mutation({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      transformResponse: (response: FullResponse<ItemChatResponse[]>) =>
        response.data,
    }),
    getDetailChat: builder.mutation({
      query: (params: {otherUserId: string; page: number; limit: number}) => ({
        url: 'conversation',
        method: 'GET',
        params,
      }),
      transformResponse: (response: FullResponse<ChatDetailResponse>) =>
        response.data,
    }),
  }),
  overrideExisting: true,
});
export const {
  useGetUserChatsMutation,
  useGetDetailChatMutation,
  useSendMessageMutation,
} = chatRTKQueryApi;
