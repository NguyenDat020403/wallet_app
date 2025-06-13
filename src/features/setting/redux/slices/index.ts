import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {SettingInitialState} from './types';
import {CreateNetworkRequest, CreateTokenRequest} from '../RTKQuery/types';
import {UpdateUserApiParams} from '../saga/types';

const initialState: SettingInitialState = {};

export const settingSlice = createSlice({
  name: 'SETTING',
  initialState,
  reducers: {
    createNetwork: (_, _action: PayloadAction<CreateNetworkRequest>) => {},
    createToken: (_, _action: PayloadAction<CreateTokenRequest>) => {},
    updateUser: (_, _action: PayloadAction<UpdateUserApiParams>) => {},
  },
});

export const {createNetwork, createToken, updateUser} = settingSlice.actions;

const settingPersistConfig = {
  key: 'setting',
  storage: AsyncStorage,
  whitelist: [],
};
export default persistReducer(settingPersistConfig, settingSlice.reducer);
