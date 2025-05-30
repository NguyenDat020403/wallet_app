import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {SettingInitialState} from './types';
import {CreateNetworkRequest} from '../RTKQuery/types';

const initialState: SettingInitialState = {};

export const settingSlice = createSlice({
  name: 'SETTING',
  initialState,
  reducers: {
    createNetwork: (_, _action: PayloadAction<CreateNetworkRequest>) => {},
  },
});

export const {createNetwork} = settingSlice.actions;

const settingPersistConfig = {
  key: 'setting',
  storage: AsyncStorage,
  whitelist: [],
};
export default persistReducer(settingPersistConfig, settingSlice.reducer);
