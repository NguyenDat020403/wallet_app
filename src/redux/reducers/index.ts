import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '@/features/auth/redux/slices';
import {RTKQueryIdentityApi} from '@/features/auth/redux/RTKQuery';

const rootReducer = combineReducers({
  // homeReducer,
  authReducer,
  [RTKQueryIdentityApi.reducerPath]: RTKQueryIdentityApi.reducer,
});

export default rootReducer;
