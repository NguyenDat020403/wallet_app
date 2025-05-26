import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {getCurrentTransactionRequest, HomeInitialState} from './types';
import {
  createTransactionBTCRequest,
  createTransactionEVMRequest,
} from '../RTKQuery/types';

const initialState: HomeInitialState = {};

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
  },
});

export const {sendBTCTransaction, sendEVMTransaction, getCurrentTransaction} =
  homeSlice.actions;

const homePersistConfig = {
  key: 'home',
  storage: AsyncStorage,
  whitelist: [],
};
export default persistReducer(homePersistConfig, homeSlice.reducer);
