import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {MainStackParamList} from '@/navigation/MainNavigation/types';
import {AuthInitialState} from './types';

const initialState: AuthInitialState = {
  isFirstLaunch: true,
  isAuthenticated: false,
  isShowRequireLogin: false,
  screenNameBeforeAuth: 'AppTabScreen',
};

export const authSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
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
  },
});

export const {
  setIsFirstLaunch,
  setIsAuthenticated,
  setScreenBeforeAuth,
  setIsShowRequireLogin,
} = authSlice.actions;

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['isAuthenticated', 'isFirstLaunch'],
};
export default persistReducer(authPersistConfig, authSlice.reducer);
