import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AppTabStackParamList} from '../BottomTabNavigator/types';
import {
  DetailWalletResponse,
  Network,
  Token,
  Tokens,
} from '@/features/home/redux/RTKQuery/types';
import {UserWallet} from '@/features/home/redux/slices/types';

export type MainStackParamList = {
  AppTabScreen: BottomTabScreenProps<AppTabStackParamList>;

  HomeScreen: undefined;
  SendScreen: {listCoin: any};
  CoinDetailScreen: {token: Tokens};
  TransactionScreen: {token: any};
  TransactionHistoryScreen: {token: Tokens; txHash: string};
  MenuScreen: undefined;
  NetworkScreen: undefined;
  AddNetworkScreen: {network?: Network; isEnableEdit?: boolean};
  TokenScreen: undefined;
  CoinMarketScreen: {token: Tokens};
  WalletScreen: {wallet: UserWallet};
  WalletAddressScreen: {wallet_id: string};
  AddWalletScreen: undefined;
  ReceiveScreen: {tokens?: DetailWalletResponse};
  ReceiveQRCodeScreen: {data: Tokens; wallet_id: string};
  ScanScreen: undefined;
  //auth
  FirstScreen: undefined;
  ImportWalletScreen: undefined;
  PasswordRecoveryScreen: {mnemonic: string};
  CreateNewWalletScreen: undefined;
  BackUpWalletScreen: undefined;
  IcloudBackUpScreen: undefined;
  ManualBackUpScreen: {listWordSecret: any[]};
  ConfirmManualBackUpScreen: {listWordSecret: any[]};
  RecoveryPhraseScreen: {callBack?: () => void};
  LoginScreen: {isGoBackEnable?: boolean};
  //forum
  PostScreen: undefined;
  CreatePostScreen: undefined;
};
