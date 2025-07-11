import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AppTabStackParamList} from '../BottomTabNavigator/types';
import {
  DetailWalletResponse,
  DetailWalletResponseV1,
  GroupedTokens,
  Network,
  Token,
  Tokens,
} from '@/features/home/redux/RTKQuery/types';
import {UserWallet} from '@/features/home/redux/slices/types';
import {Post} from '@/features/forum/redux/RTKQuery/types';
import {User} from '@/features/auth/redux/slices/types';

export type MainStackParamList = {
  AppTabScreen: BottomTabScreenProps<AppTabStackParamList>;

  HomeScreen: undefined;
  SendScreen: {listCoin: GroupedTokens};
  CoinDetailScreen: {token: Tokens};
  TransactionScreen: {token: any};
  TransactionHistoryScreen: {token: Tokens; txHash: string};
  MenuScreen: undefined;
  CoinMarketScreen: {token: Tokens};
  WalletScreen: {wallet: UserWallet};
  WalletAddressScreen: {wallet_id: string};
  AddWalletScreen: undefined;
  ReceiveScreen: {tokens?: DetailWalletResponseV1};
  ReceiveQRCodeScreen: {data: Tokens; wallet_id: string};
  ScanScreen: {callBack?: (data: any) => void};

  //setting
  NetworkScreen: undefined;
  AddNetworkScreen: {network?: Network; isEnableEdit?: boolean};
  TokenScreen: undefined;
  ProfileScreen: {userId: string};
  ProfileEditScreen: undefined;

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
  PostDetailScreen: {
    data?: Post;
    postId?: string;
    userId?: string;
  };

  //chat
  UserChatListScreen: undefined;
  UserChatDetailScreen: {userId: string; userName: string; avatar: string};
};
