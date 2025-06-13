export interface UpdateUserApiParams {
  username?: string;
  bio?: string;
  file?: {
    uri?: string;
    name?: string;
    type?: string;
  };
  callback?: () => void;
}
