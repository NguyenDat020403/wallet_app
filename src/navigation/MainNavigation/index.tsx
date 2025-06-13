import React from 'react';
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
import * as networkScreenList from '@/features/setting/screens/NetworkScreen/screens';
import * as homeScreenList from '@/features/home/screens';
import * as forumScreenList from '@/features/forum/screens';
import * as chatScreenList from '@/features/chat/screens';
const Stack = createNativeStackNavigator<MainStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const route = {
  ...settingScreenList,
  ...authScreenList,
  ...homeScreenList,
  ...networkScreenList,
  ...forumScreenList,
  ...chatScreenList,
};

const MainNavigator = () => {
  const {isFirstLaunch} = useAppSelector(store => store.authReducer);

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
