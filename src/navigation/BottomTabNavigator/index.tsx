import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ScreenComponent} from '../types';
import {
  AppTabStackParamList,
  HistoryTabStackParamList,
  HomeTabStackParamList,
  PostTabStackParamList,
} from './types';
import {generateTabBarItemOptions} from './functions';
import {
  IconHistory,
  IconHistoryActive,
  IconSearch,
  IconSearchActive,
  IconWallet,
  IconWalletActive,
} from '@/assets/icons';
import {HomeScreen, SendScreen, StoryScreen} from '@/features/home/screens';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {PostScreen} from '@/features/forum/screens';
const Tab = createBottomTabNavigator<AppTabStackParamList>();
const StackHistory = createNativeStackNavigator<HistoryTabStackParamList>();
const StackHome = createNativeStackNavigator<HomeTabStackParamList>();
const StackPost = createNativeStackNavigator<PostTabStackParamList>();

const profileTabRoute = {
  PostScreen,
};

function PostStack() {
  return (
    <StackPost.Navigator>
      {Object.entries(profileTabRoute).map(([name, component]) => {
        return (
          <StackPost.Screen
            key={name}
            name={name as keyof PostTabStackParamList}
            component={component as ScreenComponent}
            options={{
              headerShown: false,
            }}
          />
        );
      })}
    </StackPost.Navigator>
  );
}

const homeTabRoute = {
  HomeScreen,
};

function HomeStack() {
  return (
    <StackHome.Navigator>
      {Object.entries(homeTabRoute).map(([name, component]) => {
        return (
          <StackHome.Screen
            key={name}
            name={name as keyof HomeTabStackParamList}
            component={component as ScreenComponent}
            options={{
              headerShown: false,
            }}
          />
        );
      })}
    </StackHome.Navigator>
  );
}

const historyTabRoute = {
  HomeScreen,
};

function HistoryStack() {
  return (
    <StackHistory.Navigator>
      {Object.entries(historyTabRoute).map(([name, component]) => {
        return (
          <StackHistory.Screen
            key={name}
            name={name as keyof HistoryTabStackParamList}
            component={component as ScreenComponent}
            options={{
              headerShown: false,
            }}
          />
        );
      })}
    </StackHistory.Navigator>
  );
}

export const AppTab: React.FC<NativeStackScreenProps<any>> = () => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({route}) => {
        return {
          lazy: true,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: safeAreaInsets.bottom + 60,
            paddingTop: 8,
            backgroundColor: '#0F0F0F',
            position: 'absolute',
          },
          tabBarShowLabel: false,
        };
      }}>
      <Tab.Screen
        name={'PostTab'}
        component={PostStack}
        options={generateTabBarItemOptions({
          icon: IconHistory,
          activeIcon: IconHistoryActive,
        })}
      />
      <Tab.Screen
        name={'HomeTab'}
        component={HomeStack}
        options={generateTabBarItemOptions({
          icon: IconWallet,
          activeIcon: IconWalletActive,
        })}
      />
      <Tab.Screen
        name={'HistoryTab'}
        component={HistoryStack}
        options={generateTabBarItemOptions({
          icon: IconSearch,
          activeIcon: IconSearchActive,
        })}
      />
    </Tab.Navigator>
  );
};
