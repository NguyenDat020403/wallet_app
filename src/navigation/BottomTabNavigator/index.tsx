import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ScreenComponent} from '../types';
import {
  AppTabStackParamList,
  CartTabStackParamList,
  CategoriesTabStackParamList,
  HomeTabStackParamList,
  WishListTabStackParamList,
  ProfileTabStackParamList,
} from './types';
import {generateTabBarItemOptions} from './functions';
import {
  IconCart,
  IconCartActive,
  IconCategories,
  IconCategoriesActive,
  IconHome,
  IconHomeActive,
  IconProfile,
  IconProfileActive,
  IconWishList,
  IconWishListActive,
} from '@/assets/icons';
import {HomeScreen, StoryScreen} from '@/features/home/screens';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';

const Tab = createBottomTabNavigator<AppTabStackParamList>();
const StackHome = createNativeStackNavigator<HomeTabStackParamList>();
const StackWishList = createNativeStackNavigator<WishListTabStackParamList>();
const StackCategories =
  createNativeStackNavigator<CategoriesTabStackParamList>();
const StackCart = createNativeStackNavigator<CartTabStackParamList>();
const StackProfile = createNativeStackNavigator<ProfileTabStackParamList>();

const homeTabRoute = {
  HomeScreen,
  StoryScreen,
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

const profileTabRoute = {
  HomeScreen,
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
const WishListTabRoute = {
  HomeScreen,
};

function WishListStack() {
  return (
    <StackWishList.Navigator>
      {Object.entries(WishListTabRoute).map(([name, component]) => {
        return (
          <StackWishList.Screen
            key={name}
            name={name as keyof WishListTabStackParamList}
            component={component as ScreenComponent}
            options={{
              headerShown: false,
            }}
          />
        );
      })}
    </StackWishList.Navigator>
  );
}

const cartTabRoute = {
  HomeScreen,
};

function CartStack() {
  return (
    <StackCart.Navigator>
      {Object.entries(cartTabRoute).map(([name, component]) => {
        return (
          <StackCart.Screen
            key={name}
            name={name as keyof CartTabStackParamList}
            component={component as ScreenComponent}
            options={{
              headerShown: false,
            }}
          />
        );
      })}
    </StackCart.Navigator>
  );
}
const categoriesTabRoute = {
  HomeScreen,
};

function CategoriesStack() {
  return (
    <StackCategories.Navigator>
      {Object.entries(categoriesTabRoute).map(([name, component]) => {
        return (
          <StackCategories.Screen
            key={name}
            name={name as keyof CategoriesTabStackParamList}
            component={component as ScreenComponent}
            options={{
              headerShown: false,
            }}
          />
        );
      })}
    </StackCategories.Navigator>
  );
}

export const AppTab: React.FC<NativeStackScreenProps<any>> = () => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();

  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          lazy: true,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: safeAreaInsets.bottom + 60,
            borderTopWidth: 1,
            borderTopColor: '#FEF7EB3D',
            backgroundColor: '#FFFFFF',
            elevation: 0,
            position: 'absolute',
          },
          tabBarShowLabel: false,
        };
      }}>
      <Tab.Screen
        name={'HomeTab'}
        component={HomeStack}
        options={generateTabBarItemOptions({
          icon: IconHome,
          activeIcon: IconHomeActive,
        })}
      />
      <Tab.Screen
        name={'WishListTab'}
        component={WishListStack}
        options={generateTabBarItemOptions({
          icon: IconWishList,
          activeIcon: IconWishListActive,
        })}
      />
      <Tab.Screen
        name={'CategoriesTab'}
        component={CategoriesStack}
        options={generateTabBarItemOptions({
          icon: IconCategories,
          activeIcon: IconCategoriesActive,
        })}
      />
      <Tab.Screen
        name={'CartTab'}
        component={CartStack}
        options={generateTabBarItemOptions({
          icon: IconCart,
          activeIcon: IconCartActive,
        })}
      />
      <Tab.Screen
        name={'ProfileTab'}
        component={ProfileStack}
        options={generateTabBarItemOptions({
          icon: IconProfile,
          activeIcon: IconProfileActive,
        })}
      />
    </Tab.Navigator>
  );
};
