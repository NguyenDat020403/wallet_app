import axios from 'axios';
import setInterceptor from './interceptor';
import Config from 'react-native-config';
import {Platform} from 'react-native';

const headers = {
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  DeviceType: Platform.OS,
  TimezoneOffset: new Date().getTimezoneOffset(),
};

export const BASE_URL_AUTH = Config.API_URL_AUTH;
const apiIdentity = axios.create({
  baseURL: BASE_URL_AUTH,
  headers,
});

setInterceptor(apiIdentity);

export {apiIdentity};
