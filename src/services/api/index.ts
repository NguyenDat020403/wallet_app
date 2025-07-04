import axios from 'axios';
import setInterceptor from './interceptor';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import {store} from '@/redux';
import tokenService from '@/features/auth/services/tokenService';
const accessToken = tokenService.getLocalAccessToken();

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${accessToken}`,
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

const apiUser = axios.create({
  baseURL: Config.API_URL_USER,
  headers,
});

const apiUpload = axios.create({
  baseURL: Config.API_URL_UPLOAD,
  headers,
});

setInterceptor(apiUser);
setInterceptor(apiToken);
setInterceptor(apiWallet);
setInterceptor(apiUpload);
setInterceptor(apiNetwork);
setInterceptor(apiIdentity);
setInterceptor(apiNotification);
setInterceptor(apiTransaction);

export {
  apiUser,
  apiIdentity,
  apiNotification,
  apiTransaction,
  apiNetwork,
  apiToken,
  apiUpload,
  apiWallet,
};
