import {UserResponse} from '@/features/auth/redux/RTKQuery/types';

export interface ItemChatResponse {
  user_id: string;
  username: string;
  avatar?: string;
  lastMessage: LastMessage;
}
export interface LastMessage {
  sender: UserResponse;
  content: string;
  created_at: string;
}
export interface ChatDetailResponse {
  messages: Message[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Message {
  message_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
