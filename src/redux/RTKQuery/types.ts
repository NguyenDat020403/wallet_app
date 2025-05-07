export interface FullResponse<T> {
  message: string;
  data?: T;
  status?: string;
  error?: string;
}
