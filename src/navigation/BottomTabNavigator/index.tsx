import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ScreenComponent} from '../types';
import {
  AppTabStackParamList,
  ChatTabStackParamList,
  HomeTabStackParamList,
  PostTabStackParamList,
} from './types';
import {generateTabBarItemOptions} from './functions';
import {
  IconChat,
  IconChatActive,
  IconFeed,
  IconFeedActive,
  IconHome,
  IconHomeActive,
} from '@/assets/icons';
import {HomeScreen} from '@/features/home/screens';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {PostScreen} from '@/features/forum/screens';
import {UserChatListScreen} from '@/features/chat/screens';
const Tab = createBottomTabNavigator<AppTabStackParamList>();
const StackChat = createNativeStackNavigator<ChatTabStackParamList>();
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

const chatTabRoute = {
  UserChatListScreen,
};

function ChatStack() {
  return (
    <StackChat.Navigator>
      {Object.entries(chatTabRoute).map(([name, component]) => {
        return (
          <StackChat.Screen
            key={name}
            name={name as keyof ChatTabStackParamList}
            component={component as ScreenComponent}
            options={{
              headerShown: false,
            }}
          />
        );
      })}
    </StackChat.Navigator>
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
            backgroundColor: '#FFFFFF',
            position: 'absolute',
          },
          tabBarShowLabel: false,
        };
      }}>
      <Tab.Screen
        name={'PostTab'}
        component={PostStack}
        options={generateTabBarItemOptions({
          icon: IconFeed,
          activeIcon: IconFeedActive,
        })}
      />
      <Tab.Screen
        name={'HomeTab'}
        component={HomeStack}
        options={generateTabBarItemOptions({
          icon: IconHome,
          activeIcon: IconHomeActive,
        })}
      />
      <Tab.Screen
        name={'ChatTab'}
        component={ChatStack}
        options={generateTabBarItemOptions({
          icon: IconChat,
          activeIcon: IconChatActive,
        })}
      />
    </Tab.Navigator>
  );
};
