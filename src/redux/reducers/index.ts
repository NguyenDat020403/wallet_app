import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '@/features/auth/redux/slices';
import forumReducer from '@/features/forum/redux/slices';
import settingReducer from '@/features/setting/redux/slices';
import commonReducer from '@/features/common/redux/slices';
import homeReducer from '@/features/home/redux/slices';
import {
  RTKQueryIdentityApi,
  RTKQueryNetworkApi,
  RTKQueryNotificationApi,
  RTKQueryPostApi,
  RTKQueryTokenApi,
  RTKQueryTransactionApi,
  RTKQueryUserApi,
  RTKQueryWalletApi,
} from '../RTKQuery';

const rootReducer = combineReducers({
  homeReducer,
  authReducer,
  settingReducer,
  commonReducer,
  forumReducer,
  [RTKQueryIdentityApi.reducerPath]: RTKQueryIdentityApi.reducer,
  [RTKQueryWalletApi.reducerPath]: RTKQueryWalletApi.reducer,
  [RTKQueryNetworkApi.reducerPath]: RTKQueryNetworkApi.reducer,
  [RTKQueryTokenApi.reducerPath]: RTKQueryTokenApi.reducer,
  [RTKQueryPostApi.reducerPath]: RTKQueryPostApi.reducer,
  [RTKQueryUserApi.reducerPath]: RTKQueryUserApi.reducer,
  [RTKQueryTransactionApi.reducerPath]: RTKQueryTransactionApi.reducer,
  [RTKQueryNotificationApi.reducerPath]: RTKQueryNotificationApi.reducer,
});

export default rootReducer;
