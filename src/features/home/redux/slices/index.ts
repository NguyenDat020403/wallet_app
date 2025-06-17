import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {
  getCurrentTransactionRequest,
  HomeInitialState,
  ImportWalletApiParams,
  SwapTokenApiParams,
  UserWallet,
} from './types';
import {
  createTransactionBTCRequest,
  createTransactionEVMRequest,
  TransactionHistory,
} from '../RTKQuery/types';

const initialState: HomeInitialState = {
  userWallet: [],
  isChangeWalletName: false,
  currentTransactionHash: '',
  detailCurrentTransaction: {
    time_transaction: '',
    transaction_hash: '',
    action_transaction: '0',
    from_address: '',
    to_address: '',
    fee_network: '',
    network_name: '',
    block_hash: '',
    block_height: 0,
    value: '',
  },
};

export const homeSlice = createSlice({
  name: 'HOME',
  initialState,
  reducers: {
    createWallet: (_, _action: PayloadAction<any>) => {},
    importWallet: (_, _action: PayloadAction<ImportWalletApiParams>) => {},
    swapToken: (_, _action: PayloadAction<SwapTokenApiParams>) => {},
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
    setCurrentTransactionHash: (state, action: PayloadAction<string>) => {
      state.currentTransactionHash = action.payload;
    },
    setIsChangeWalletName: (state, action: PayloadAction<boolean>) => {
      state.isChangeWalletName = action.payload;
    },
    getCurrentTransactionHash: (state, action) => {
      state.currentTransactionHash = action.payload;
    },
    setDetailCurrentTransaction: (
      state,
      action: PayloadAction<TransactionHistory>,
    ) => {
      state.detailCurrentTransaction = action.payload;
    },
    getDetailCurrentTransaction: (state, action) => {
      state.detailCurrentTransaction = action.payload;
    },
  },
});

export const {
  createWallet,
  importWallet,
  swapToken,
  setDetailCurrentTransaction,
  getDetailCurrentTransaction,
  setIsChangeWalletName,
  sendBTCTransaction,
  sendEVMTransaction,
  getCurrentTransaction,
  setUserWallets,
  getUserWallets,
  setCurrentTransactionHash,
  getCurrentTransactionHash,
} = homeSlice.actions;

const homePersistConfig = {
  key: 'home',
  storage: AsyncStorage,
  whitelist: ['userWallet'],
};
export default persistReducer(homePersistConfig, homeSlice.reducer);
