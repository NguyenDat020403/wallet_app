import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {MainStackParamList} from '@/navigation/MainNavigation/types';
import {AccessInfo, AuthInitialState, SecretLocal, User} from './types';
import {LoginUserApiParams} from '../../services/api/types';

const initialState: AuthInitialState = {
  accessInfo: {},
  isFirstLaunch: true,
  isAuthenticated: false,
  isShowRequireLogin: false,
  screenNameBeforeAuth: 'AppTabScreen',
  secretLocal: {},
  currentUser: {},
};

export const authSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    loginUser: (_, _action: PayloadAction<LoginUserApiParams>) => {},
    setAccessInfo: (state, action: PayloadAction<AccessInfo>) => {
      state.accessInfo = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
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
      state.secretLocal = action.payload;
    },
    setCurrentUserProfile: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
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
  setIsFirstLaunch,
  setIsAuthenticated,
  setScreenBeforeAuth,
  setIsShowRequireLogin,
  setSecretLocal,
  setCurrentUserProfile,
  setAccessInfo,
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
  ],
};
export default persistReducer(authPersistConfig, authSlice.reducer);
