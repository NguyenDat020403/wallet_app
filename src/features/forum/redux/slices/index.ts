import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {ForumInitialState} from './types';

const initialState: ForumInitialState = {
  postDeletedId: '',
};

export const forumSlice = createSlice({
  name: 'FORUM',
  initialState,
  reducers: {
    setPostDeletedId: (state, action: PayloadAction<string>) => {
      state.postDeletedId = action.payload;
    },
  },
});

export const {setPostDeletedId} = forumSlice.actions;

const forumPersistConfig = {
  key: 'forum',
  storage: AsyncStorage,
  whitelist: [],
};
export default persistReducer(forumPersistConfig, forumSlice.reducer);
