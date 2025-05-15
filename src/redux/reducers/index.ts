import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '@/features/auth/redux/slices';
import commonReducer from '@/features/common/redux/slices';
import {
  RTKQueryIdentityApi,
  RTKQueryNetworkApi,
  RTKQueryTransactionApi,
  RTKQueryWalletApi,
} from '../RTKQuery';

const rootReducer = combineReducers({
  // homeReducer,
  authReducer,
  commonReducer,
  [RTKQueryIdentityApi.reducerPath]: RTKQueryIdentityApi.reducer,
  [RTKQueryWalletApi.reducerPath]: RTKQueryWalletApi.reducer,
  [RTKQueryNetworkApi.reducerPath]: RTKQueryNetworkApi.reducer,
  [RTKQueryTransactionApi.reducerPath]: RTKQueryTransactionApi.reducer,
});

export default rootReducer;
