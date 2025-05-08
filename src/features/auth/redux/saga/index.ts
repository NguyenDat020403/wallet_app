import {PayloadAction} from '@reduxjs/toolkit';
import {SagaIterator} from 'redux-saga';
import {FullResponse, LoginResponse} from '../RTKQuery/types';
import {authApi} from '../../services';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  loginUser,
  setAccessInfo,
  setCurrentUserProfile,
  setCurrentWalletIDLocal,
  setIsAuthenticated,
} from '../slices';
import {navigate} from '@/navigation/RootNavigation';
import {showToastMessage} from '@/functions';
import {hideAppLoading, showAppLoading} from '@/features/common/functions';

function* loginUserSaga(action: PayloadAction<any>): SagaIterator<any> {
  showAppLoading();
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
      yield put(setIsAuthenticated(false));
      yield put(setCurrentWalletIDLocal(dataLogin?.wallet.wallet_id!));
      navigate('HomeScreen');
    } else {
      console.log('mesadassda', apiError);
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
    hideAppLoading();
  }
}

export default function* authSaga() {
  yield takeLatest(loginUser, loginUserSaga);
}
