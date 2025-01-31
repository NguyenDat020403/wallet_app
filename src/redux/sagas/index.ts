// import homeSaga from '@/features/home/redux/saga';
import {all} from 'redux-saga/effects';
export default function* rootSaga() {
  yield all([
    // homeSaga(),
  ]);
}
