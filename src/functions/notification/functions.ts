import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {navigate, navigationRef} from '@/navigation/RootNavigation';
import {AppState, Linking, PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {store} from '@/redux';
import {setDeviceNotiToken} from '@/features/auth/redux/slices';

export const displayNotification = async (
  res: FirebaseMessagingTypes.RemoteMessage,
) => {
  const channelId = await notifee.createChannel({
    id: 'wallet_channel',
    name: 'Wallet Channel',
    sound: 'default',
  });
  await notifee.displayNotification({
    title: res.notification?.title,
    body: res.notification?.body,
    data: res.data,
    android: {
      channelId,
      sound: 'default',
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
    },
  });
};
export const checkPermission = async () => {
  notifee.requestPermission({
    sound: true,
  });
};
export const onForegroundEvent = () => {
  notifee.onForegroundEvent(({type, detail}) => {
    if (type === EventType.PRESS) {
      console.log('Notification pressed', detail);
      const data = detail.notification?.data;
      if (data?.userId && data?.postId) {
        navigate('PostDetailScreen', {
          userId: data.userId.toString(),
          postId: data.postId.toString(),
        });
      } else {
        console.warn('Missing userId or postId in notification data');
      }
    }
  });
};

export const requestUserPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted:', authStatus);
    const token = await messaging().getToken();
    console.log('FCM Token:', token);

    if (token) {
      try {
        store.dispatch(setDeviceNotiToken(token));
        return token;
      } catch (err) {}
    }
  } else {
    console.log('Notification permission not granted');
  }
};
export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Camera permission granted:', authStatus);
    const token = await messaging().getToken();
    console.log('Camera Token:', token);
    return token;
    // if (token) {
    //   try {
    //     store.dispatch(setDeviceNotiToken(token));
    //     return token;
    //   } catch (err) {}
    // }
  } else {
    console.log('Camera permission not granted');
  }
};
export const handleAppLinkOpen = ({url}: {url: string}) => {
  console.log('[DeepLink]', url);

  try {
    const parsedUrl = new URL(url); // ✅ JavaScript native
    const path = parsedUrl.pathname.replace(/^\/+/g, ''); // loại bỏ dấu /
    const postId = decodeURIComponent(
      parsedUrl.searchParams.get('postId') ?? '',
    );
    const userId = decodeURIComponent(
      parsedUrl.searchParams.get('userId') ?? '',
    );

    console.log('[Parsed]', {path, postId, userId});

    if (path === 'post-detail' && postId && userId) {
      navigationRef.current?.navigate('PostDetailScreen', {
        postId: postId,
        userId: userId,
      });
    }
  } catch (error) {
    console.warn('Invalid URL in deep link:', url);
  }
};
