import axios from 'axios';
import setInterceptor from './interceptor';
import Config from 'react-native-config';
import {Platform} from 'react-native';

const headers = {
  Accept: 'application/json',
};

const apiIdentity = axios.create({
  baseURL: Config.API_URL_AUTH,
  headers,
});
const apiWallet = axios.create({
  baseURL: Config.API_URL_WALLET,
  headers,
});

setInterceptor(apiIdentity);

export {apiIdentity};
