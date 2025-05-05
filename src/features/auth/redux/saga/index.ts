import {PayloadAction} from '@reduxjs/toolkit';
import {SagaIterator} from 'redux-saga';
import {FullResponse, LoginResponse} from '../RTKQuery/types';
import {authApi} from '../../services';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  loginUser,
  setAccessInfo,
  setCurrentUserProfile,
  setIsAuthenticated,
} from '../slices';
import {navigate} from '@/navigation/RootNavigation';
import {showToastMessage} from '@/functions';

function* loginUserSaga(action: PayloadAction<any>): SagaIterator<any> {
  try {
    const {
      message: message,
      data: dataLogin,
      status,
      error: apiError,
    }: FullResponse<LoginResponse> = yield call(
      authApi.loginUserApi,
      action.payload,
    );

    if (status === '200') {
      console.log('Da thanh cong o day');
      yield put(setAccessInfo(dataLogin!.token));
      yield put(setCurrentUserProfile(dataLogin!.user));
      yield put(setIsAuthenticated(true));
      navigate('HomeScreen');
    } else {
      console.log(apiError);
      switch (apiError) {
        case 'EA01':
          showToastMessage('User does not exist');
          break;
        case 'EA02':
          showToastMessage('Invalid password');
          break;
        default:
          showToastMessage('Internal server error');
          break;
      }
    }
  } catch (e: any) {
    console.log('loginUserSaga1231232', e.message);
  } finally {
    console.log('loginUserSaga done');
  }
}
export default function* authSaga() {
  yield takeLatest(loginUser, loginUserSaga);
}
