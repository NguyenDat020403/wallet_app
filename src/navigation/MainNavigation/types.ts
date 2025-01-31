import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AppTabStackParamList} from '../BottomTabNavigator/types';

export type MainStackParamList = {
  AppTabScreen: BottomTabScreenProps<AppTabStackParamList>;

  HomeScreen: undefined;
  StoryScreen: {userId: string};
  //auth
  FirstScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  RecoveryPasswordScreen: undefined;
};
