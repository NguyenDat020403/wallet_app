import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {MainStackParamList} from '@/navigation/MainNavigation/types';
import {AccessInfo, AuthInitialState, SecretLocal, User} from './types';
import {
  ImportWalletApiParams,
  ImportWalletParams,
  LoginUserApiParams,
  SignUpUserApiParams,
  UploadAvatarApiParams,
} from '../../services/api/types';

const initialState: AuthInitialState = {
  accessInfo: {},
  notificationToken: '',
  isFirstLaunch: true,
  isAuthenticated: false,
  isShowRequireLogin: false,
  screenNameBeforeAuth: 'AppTabScreen',
  secretLocal: [],
  currentUser: {},
  currentWalletID: '',
  biometricPublicKey: '',
};

export const authSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    loginUser: (_, _action: PayloadAction<LoginUserApiParams>) => {},
    signUpUser: (_, _action: PayloadAction<SignUpUserApiParams>) => {},
    uploadAvatar: (_, _action: PayloadAction<UploadAvatarApiParams>) => {},
    setAccessInfo: (state, action: PayloadAction<AccessInfo>) => {
      state.accessInfo = action.payload;
    },
    getAccessInfo: (state, action) => {
      state.accessInfo = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setDeviceNotiToken: (state, action: PayloadAction<string>) => {
      state.notificationToken = action.payload;
    },
    setIsFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    setScreenBeforeAuth: (
      state,
      action: PayloadAction<keyof MainStackParamList>,
    ) => {
      state.screenNameBeforeAuth = action.payload;
    },
    setIsShowRequireLogin: (state, action: PayloadAction<boolean>) => {
      state.isShowRequireLogin = action.payload;
    },
    setSecretLocal: (state, action: PayloadAction<SecretLocal>) => {
      state.secretLocal.push(action.payload);
    },
    setCurrentUserProfile: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setCurrentWalletIDLocal: (state, action: PayloadAction<string>) => {
      state.currentWalletID = action.payload;
    },
    setBiometricPublicKey: (state, action: PayloadAction<string>) => {
      state.biometricPublicKey = action.payload;
    },
    logout: state => {
      return {
        ...initialState,
        isFirstLaunch: state.isFirstLaunch,
      };
    },
  },
});

export const {
  loginUser,
  signUpUser,
  importWallet,
  uploadAvatar,
  setBiometricPublicKey,
  setIsFirstLaunch,
  setDeviceNotiToken,
  setIsAuthenticated,
  setScreenBeforeAuth,
  setIsShowRequireLogin,
  setSecretLocal,
  setCurrentUserProfile,
  setAccessInfo,
  setCurrentWalletIDLocal,
  logout,
} = authSlice.actions;

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: [
    'accessInfo',
    'isAuthenticated',
    'isFirstLaunch',
    'currentUser',
    'secretLocal',
    'currentWalletAddress',
    'notificationToken',
    'currentWalletID',
    'biometricPublicKey',
  ],
};
export default persistReducer(authPersistConfig, authSlice.reducer);
