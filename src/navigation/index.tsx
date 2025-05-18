import React, {useEffect} from 'react';
import {navigationRef} from './RootNavigation';
import MainNavigator from './MainNavigation';
import SplashScreen from 'react-native-splash-screen';
import {useLogger} from '@react-navigation/devtools';
import {useAppSelector} from '../redux/hooks';
import {AppLoading} from '../components';

import messaging from '@react-native-firebase/messaging';
import {Linking, ActivityIndicator} from 'react-native';
import {
  LinkingOptions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainStackParamList} from './MainNavigation/types';
import {
  displayNotification,
  onForegroundEvent,
} from '../functions/notification/functions';

const NAVIGATION_IDS = ['HomeScreen', 'MenuScreen'];
function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId);
    return null;
  }
  if (navigationId === 'HomeScreen') {
    return 'myapp://home';
  }
  if (navigationId === 'MenuScreen') {
    return 'myapp://settings';
  }
  return null;
}
const linking: LinkingOptions<MainStackParamList> = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      HomeScreen: 'home',
      MenuScreen: 'settings',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handle in the background: ', remoteMessage);
    });

    const foreground = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived: ', remoteMessage);
      displayNotification(remoteMessage);
      onForegroundEvent();
    });

    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });
    return () => {
      linkingSubscription.remove();
      unsubscribe();
      foreground();
    };
  },
};

const RootNavigator = () => {
  //   const dispatch = useAppDispatch();
  useLogger(navigationRef);
  //   const accessToken = useAppSelector(state => state.authReducer.accessInfo.accessToken);
  const {isAppLoading} = useAppSelector(state => state.commonReducer);
  const {isAuthenticated} = useAppSelector(state => state.authReducer);
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <MainNavigator />
      <AppLoading
        isVisible={isAppLoading}
        overlayStyle={{backgroundColor: 'transparent'}}
      />
    </NavigationContainer>
  );
};

export default RootNavigator;
