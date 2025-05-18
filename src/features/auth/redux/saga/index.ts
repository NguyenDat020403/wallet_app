import {PayloadAction} from '@reduxjs/toolkit';
import {SagaIterator} from 'redux-saga';
import {FullResponse, LoginResponse, SignUpResponse} from '../RTKQuery/types';
import {authApi} from '../../services';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  loginUser,
  setAccessInfo,
  setCurrentUserProfile,
  setCurrentWalletIDLocal,
  setDeviceNotiToken,
  setIsAuthenticated,
  setSecretLocal,
  signUpUser,
} from '../slices';
import {navigate} from '@/navigation/RootNavigation';
import {showToastMessage} from '@/functions';
import {hideAppLoading, showAppLoading} from '@/features/common/functions';
import {
  RegisterNotiTokenApi,
  SignUpUserApiParams,
} from '../../services/api/types';

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
function* signUpUserSaga(
  action: PayloadAction<SignUpUserApiParams>,
): SagaIterator<any> {
  showAppLoading();
  try {
    const {
      message: message,
      data: dataSignUp,
      status,
      error: apiError,
    }: FullResponse<SignUpResponse> = yield call(authApi.signupUserApi, {
      email: action.payload.email,
      password: action.payload.password,
      username: action.payload.username,
    });

    if (message === 'success') {
      console.log('Da thanh cong o day');
      yield put(setAccessInfo(dataSignUp!.token));
      yield put(setCurrentUserProfile(dataSignUp!.user));
      yield put(setIsAuthenticated(false));
      yield put(
        setCurrentWalletIDLocal(dataSignUp?.walletDefault.wallet.wallet_id!),
      );
      yield put(setSecretLocal(dataSignUp?.walletDefault.walletSecret!));
      action.payload.callback && action.payload.callback();
    }
  } catch (e: any) {
    showToastMessage(e.message);
  } finally {
    hideAppLoading();
  }
}

function* registerNotiTokenSaga(
  action: PayloadAction<RegisterNotiTokenApi>,
): SagaIterator<any> {
  try {
    const {
      message: message,
      data: dataResponse,
      status,
      error: apiError,
    }: FullResponse<SignUpResponse> = yield call(authApi.registerNotiTokenApi, {
      FCMToken: action.payload.FCMToken,
    });

    if (message === 'success') {
      console.log('Da luu thanh cong noti token: ', dataResponse);
    }
  } catch (e: any) {
    showToastMessage(e.message);
  } finally {
    console.log('Da luu thanh cong noti token');
  }
}
export default function* authSaga() {
  yield takeLatest(loginUser, loginUserSaga);
  yield takeLatest(signUpUser, signUpUserSaga);
}
