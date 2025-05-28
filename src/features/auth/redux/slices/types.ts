import {MainStackParamList} from '@/navigation/MainNavigation/types';
import {AccessInfoResponse} from '../../services/api/types';
import {UserResponse, WalletSecretResponse} from '../RTKQuery/types';
export type AuthInitialState = {
  accessInfo: AccessInfo;
  notificationToken: string;
  isFirstLaunch: boolean;
  isAuthenticated: boolean;
  isShowRequireLogin: boolean;
  screenNameBeforeAuth: keyof MainStackParamList;
  secretLocal: SecretLocal;
  currentUser: User;
  currentWalletID: string;
  biometricPublicKey: string;
};

export type SecretLocal = WalletSecretResponse;

export type User = UserResponse;
export type AccessInfo = AccessInfoResponse;
