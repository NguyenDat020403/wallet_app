// import homeSaga from '@/features/home/redux/saga';

import authSaga from '@/features/auth/redux/saga';
import {all} from 'redux-saga/effects';
export default function* rootSaga() {
  yield all([
    authSaga(),
    // homeSaga(),
  ]);
}
