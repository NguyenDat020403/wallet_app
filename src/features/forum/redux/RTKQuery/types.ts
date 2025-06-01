export interface ListPostResponse {
  total: number;
  page: number;
  limit: number;
  data: Post[];
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
