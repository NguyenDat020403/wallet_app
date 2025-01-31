import React from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {Pressable, Text, View} from 'react-native';
import {Image} from '@rneui/base';

type GenerateTabBarItemOptionsProps = {
  icon: React.FC;
  activeIcon: React.FC;
};
export const generateTabBarItemOptions = (
  props: GenerateTabBarItemOptionsProps,
): BottomTabNavigationOptions => {
  return {
    tabBarIcon: ({focused}) => (
      <Image
        source={focused ? props.activeIcon : props.icon}
        style={{width: 20, height: 20}}
        resizeMode="contain"
      />
    ),
  };
};
