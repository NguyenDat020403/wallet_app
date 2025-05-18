import React, {useEffect} from 'react';
import {AppTab} from '../BottomTabNavigator';
import {ScreenComponent} from '../types';
import {MainStackParamList} from './types';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {useAppSelector} from '@/redux/hooks';
import * as authScreenList from '@/features/auth/screens';
import * as settingScreenList from '@/features/setting/screens';
import * as homeScreenList from '@/features/home/screens';
import {useRegisterTokenNotificationMutation} from '@/features/home/redux/RTKQuery';
const Stack = createNativeStackNavigator<MainStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const route = {
  ...settingScreenList,
  ...authScreenList,
  ...homeScreenList,
};

const MainNavigator = () => {
  const {isFirstLaunch, notificationToken, isAuthenticated} = useAppSelector(
    store => store.authReducer,
  );
  console.log('noti: ', notificationToken);
  const [registerNotiToken] = useRegisterTokenNotificationMutation();
  useEffect(() => {
    if (isAuthenticated) {
      registerNotiToken({FCMToken: notificationToken});
    }
  }, [isAuthenticated]);
  return (
    <Stack.Navigator
      initialRouteName={isFirstLaunch ? 'FirstScreen' : 'AppTabScreen'}
      screenOptions={screenOptions}>
      <Stack.Screen
        name="AppTabScreen"
        component={AppTab as ScreenComponent}
        options={{
          headerShown: false,
        }}
      />
      {Object.entries(route).map(([name, component]) => {
        return (
          <Stack.Screen
            key={name}
            name={name as keyof MainStackParamList}
            component={component as ScreenComponent}
            options={{
              headerShown: false,
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default MainNavigator;
