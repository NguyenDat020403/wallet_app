import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AppTabStackParamList} from '../BottomTabNavigator/types';

export type MainStackParamList = {
  AppTabScreen: BottomTabScreenProps<AppTabStackParamList>;

  HomeScreen: undefined;
  SendScreen: {listCoin: any};
  CoinDetailScreen: {token_id: string};
  TransactionScreen: {token: any; network: string | undefined};

  MenuScreen: undefined;
  StoryScreen: {userId: string};
  //auth
  FirstScreen: undefined;
  CreateAccountScreen: undefined;
  ImportWalletScreen: undefined;
  CreateNewWalletScreen: undefined;
  UserLoginScreen: undefined;
  BackUpWalletScreen: undefined;
  IcloudBackUpScreen: undefined;
  ManualBackUpScreen: {listWordSecret: any[]};
  ConfirmManualBackUpScreen: {listWordSecret: any[]};
  RecoveryPhraseScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  RecoveryPasswordScreen: undefined;
};
