import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import {useAppDispatch} from '@/redux/hooks';
import {setDeviceNotiToken} from '@/features/auth/redux/slices';

const NotificationSetup = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requestUserPermission = async () => {
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
            dispatch(setDeviceNotiToken(token));
            console.log('Token registered successfully');
          } catch (err) {
            console.error('Failed to register token:', err);
          }
        }
      } else {
        console.log('Notification permission not granted');
      }
    };

    requestUserPermission();
  }, []);

  return null;
};

export default NotificationSetup;
