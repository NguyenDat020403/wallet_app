import React, {useEffect} from 'react';
import {navigationRef} from './RootNavigation';
import MainNavigator from './MainNavigation';
import SplashScreen from 'react-native-splash-screen';
import {useLogger} from '@react-navigation/devtools';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
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
  handleAppLinkOpen,
  onForegroundEvent,
} from '../functions/notification/functions';
import {setIsAuthenticated} from '../features/auth/redux/slices';

function buildDeepLinkFromNotificationData(data: any) {
  const navigationId = data?.navigationId;

  switch (navigationId) {
    case 'HomeScreen':
      return 'myapp://home';
    case 'MenuScreen':
      return 'myapp://settings';
    case 'PostDetailScreen':
      const postId = data?.postId;
      const userId = data?.userId;
      if (postId && userId) {
        return `myapp://post-detail?postId=${postId}&userId=${userId}`;
      }
      break;
    default:
      console.warn('Unrecognized navigationId', navigationId);
      return null;
  }
}

const linking: LinkingOptions<MainStackParamList> = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      HomeScreen: 'home',
      MenuScreen: 'settings',
      PostDetailScreen: {
        path: 'post-detail',
        parse: {
          postId: (postId: string) => postId,
          userId: (userId: string) => userId,
        },
      },
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    console.log('[getInitialURL] Firebase Notification URL:', deeplinkURL);

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
  const dispatch = useAppDispatch();
  useLogger(navigationRef);
  const accessToken = useAppSelector(
    state => state.authReducer.accessInfo.access_token,
  );

  useEffect(() => {
    Linking.addEventListener('url', handleAppLinkOpen);

    Linking.getInitialURL().then(url => {
      if (url) {
        handleAppLinkOpen({url});
      }
    });
    return () => {
      // Clean up the listener when the component is unmounted
      Linking.removeAllListeners('url');
    };
  }, []);

  useEffect(() => {
    dispatch(setIsAuthenticated(!!accessToken));
  }, [accessToken]);
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
