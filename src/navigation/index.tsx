import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import MainNavigator from './MainNavigation';
import SplashScreen from 'react-native-splash-screen';
import {useLogger} from '@react-navigation/devtools';
import {Linking} from 'react-native';

const RootNavigator = () => {
  //   const dispatch = useAppDispatch();
  useLogger(navigationRef);
  //   const accessToken = useAppSelector(state => state.authReducer.accessInfo.accessToken);
  //   const isAppLoading = useAppSelector(state => state.commonReducer.isAppLoading);
  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
