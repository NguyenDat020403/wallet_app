import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import Config from 'react-native-config';

let isRefreshing = false;
let failedQueue: any[] = [];
const processQueue = (error: any, token = null) => {
  console.log('run queue');
  failedQueue?.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const setInterceptor = async (api: AxiosInstance) => {};

export default setInterceptor;
