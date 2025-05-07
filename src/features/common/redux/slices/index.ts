import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommonInitialState} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const initialState: CommonInitialState = {
  isAppLoading: false,
};
export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    },
  },
});

export const {setIsAppLoading} = commonSlice.actions;
const persistConfig = {
  key: 'common',
  storage: AsyncStorage,
  blacklist: [],
};
const commonReducer = persistReducer(persistConfig, commonSlice.reducer);

export default commonReducer;
