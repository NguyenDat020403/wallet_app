import axios from 'axios';
import setInterceptor from './interceptor';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import {store} from '@/redux';
const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${
    store.getState().authReducer.accessInfo.access_token
  }`,
};

const apiIdentity = axios.create({
  baseURL: Config.API_URL_AUTH,
  headers,
});
const apiWallet = axios.create({
  baseURL: Config.API_URL_WALLET,
  headers,
});
const apiTransaction = axios.create({
  baseURL: Config.API_URL_TRANSACTION,
  headers,
});

const apiNotification = axios.create({
  baseURL: Config.API_URL_NOTIFICATION,
  headers,
});

const apiNetwork = axios.create({
  baseURL: Config.API_URL_NETWORK,
  headers,
});

const apiToken = axios.create({
  baseURL: Config.API_URL_TOKEN,
  headers,
});

const apiUpload = axios.create({
  baseURL: Config.API_URL_UPLOAD,
  headers,
});

setInterceptor(apiToken);
setInterceptor(apiWallet);
setInterceptor(apiUpload);
setInterceptor(apiNetwork);
setInterceptor(apiIdentity);
setInterceptor(apiNotification);
setInterceptor(apiTransaction);

export {
  apiIdentity,
  apiNotification,
  apiTransaction,
  apiNetwork,
  apiToken,
  apiUpload,
  apiWallet,
};
