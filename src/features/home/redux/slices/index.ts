import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {
  getCurrentTransactionRequest,
  HomeInitialState,
  UserWallet,
} from './types';
import {
  createTransactionBTCRequest,
  createTransactionEVMRequest,
} from '../RTKQuery/types';

const initialState: HomeInitialState = {
  userWallet: [],
};

export const homeSlice = createSlice({
  name: 'HOME',
  initialState,
  reducers: {
    sendBTCTransaction: (
      _,
      _action: PayloadAction<createTransactionBTCRequest>,
    ) => {},
    sendEVMTransaction: (
      _,
      _action: PayloadAction<createTransactionEVMRequest>,
    ) => {},
    getCurrentTransaction: (
      _,
      _action: PayloadAction<getCurrentTransactionRequest>,
    ) => {},
    setUserWallets: (state, action: PayloadAction<UserWallet[]>) => {
      state.userWallet = action.payload;
    },
    getUserWallets: (state, action) => {
      state.userWallet = action.payload;
    },
  },
});

export const {
  sendBTCTransaction,
  sendEVMTransaction,
  getCurrentTransaction,
  setUserWallets,
  getUserWallets,
} = homeSlice.actions;

const homePersistConfig = {
  key: 'home',
  storage: AsyncStorage,
  whitelist: ['userWallet'],
};
export default persistReducer(homePersistConfig, homeSlice.reducer);
