export interface ListResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}
export interface Post {
  post_id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  user: User;
  images: Image[];
}
export interface User {
  user_id: string;
  username: string;
  avatar: string;
}

export interface Image {
  image_id: string;
  post_id: string;
  imageUrl: string;
  created_at: string;
}
export interface Comment {
  comment_id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  user: User;
}
export interface CreatePostResponse {
  post: Post;
  resource: Image[];
}
