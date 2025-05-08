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
  ProfileTabStackParamList,
  SearchTabStackParamList,
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

const Tab = createBottomTabNavigator<AppTabStackParamList>();
const StackHistory = createNativeStackNavigator<HistoryTabStackParamList>();
const StackSearch = createNativeStackNavigator<SearchTabStackParamList>();
const StackProfile = createNativeStackNavigator<ProfileTabStackParamList>();

const profileTabRoute = {
  HomeScreen,
  SendScreen,
};

function ProfileStack() {
  return (
    <StackProfile.Navigator>
      {Object.entries(profileTabRoute).map(([name, component]) => {
        return (
          <StackProfile.Screen
            key={name}
            name={name as keyof ProfileTabStackParamList}
            component={component as ScreenComponent}
            options={{
              headerShown: false,
            }}
          />
        );
      })}
    </StackProfile.Navigator>
  );
}

const searchTabRoute = {
  HomeScreen,
};

function SearchStack() {
  return (
    <StackSearch.Navigator>
      {Object.entries(searchTabRoute).map(([name, component]) => {
        return (
          <StackSearch.Screen
            key={name}
            name={name as keyof SearchTabStackParamList}
            component={component as ScreenComponent}
            options={{
              headerShown: false,
            }}
          />
        );
      })}
    </StackSearch.Navigator>
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
      initialRouteName="ProfileTab"
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
        name={'HistoryTab'}
        component={HistoryStack}
        options={generateTabBarItemOptions({
          icon: IconHistory,
          activeIcon: IconHistoryActive,
        })}
      />
      <Tab.Screen
        name={'ProfileTab'}
        component={ProfileStack}
        options={generateTabBarItemOptions({
          icon: IconWallet,
          activeIcon: IconWalletActive,
        })}
      />
      <Tab.Screen
        name={'SearchTab'}
        component={SearchStack}
        options={generateTabBarItemOptions({
          icon: IconSearch,
          activeIcon: IconSearchActive,
        })}
      />
    </Tab.Navigator>
  );
};
