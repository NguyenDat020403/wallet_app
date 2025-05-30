import axios from 'axios';
import setInterceptor from './interceptor';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import {store} from '@/redux';
const access_token = store.getState().authReducer.accessInfo.access_token;
console.log(access_token);
const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${access_token}`,
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

setInterceptor(apiNetwork);
setInterceptor(apiIdentity);
setInterceptor(apiNotification);
setInterceptor(apiTransaction);

export {apiIdentity, apiNotification, apiTransaction, apiNetwork};
