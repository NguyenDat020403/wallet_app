/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {TextEncoder, TextDecoder} from 'text-encoding';
import './src/functions/notification/notifeeBackgroundHandler';
import {configureReanimatedLogger} from 'react-native-reanimated';

configureReanimatedLogger({
  disableLogs: true,
});

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
AppRegistry.registerComponent(appName, () => App);
