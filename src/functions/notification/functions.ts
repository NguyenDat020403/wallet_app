import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {navigate, navigationRef} from '@/navigation/RootNavigation';
import {AppState} from 'react-native';

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
    },
  });
};
export const checkPermission = async () => {
  notifee.requestPermission({
    sound: true,
  });
};
export const onForegroundEvent = async () => {
  // await checkPermission();
  return notifee.onForegroundEvent(({type, detail}) => {
    if (type === EventType.PRESS) {
      const {notification} = detail;
      console.log('notification', notification);
      const navigationId = notification?.data?.navigationId;
      navigate(navigationId);
    }
  });
};
