import axios from 'axios';
import setInterceptor from './interceptor';
import Config from 'react-native-config';
import {Platform} from 'react-native';

const headers = {
  Accept: 'application/json',
};

export const BASE_URL_AUTH = Config.API_URL_AUTH;
const apiIdentity = axios.create({
  baseURL: BASE_URL_AUTH,
  headers,
});

setInterceptor(apiIdentity);

export {apiIdentity};
