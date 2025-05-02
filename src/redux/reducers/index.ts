import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '@/features/auth/redux/slices';
import {RTKQueryIdentityApi, RTKQueryWalletApi} from '../RTKQuery';

const rootReducer = combineReducers({
  // homeReducer,
  authReducer,
  [RTKQueryIdentityApi.reducerPath]: RTKQueryIdentityApi.reducer,
  [RTKQueryWalletApi.reducerPath]: RTKQueryWalletApi.reducer,
});

export default rootReducer;
