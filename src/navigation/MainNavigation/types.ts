import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AppTabStackParamList} from '../BottomTabNavigator/types';

export type MainStackParamList = {
  AppTabScreen: BottomTabScreenProps<AppTabStackParamList>;

  HomeScreen: undefined;
  MenuScreen: undefined;

  StoryScreen: {userId: string};
  //auth
  FirstScreen: undefined;
  CreateNewWalletScreen: undefined;
  BackUpWalletScreen: undefined;
  IcloudBackUpScreen: undefined;
  ManualBackUpScreen: {listWordSecret: any[]};
  ConfirmManualBackUpScreen: {listWordSecret: any[]};
  RecoveryPhraseScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  RecoveryPasswordScreen: undefined;
};
