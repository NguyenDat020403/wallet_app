import {PayloadAction} from '@reduxjs/toolkit';
import {SagaIterator} from 'redux-saga';
import {
  FullResponse,
  ImportWalletResponse,
  LoginResponse,
  SignUpResponse,
} from '../RTKQuery/types';
import {authApi} from '../../services';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  importWallet,
  loginUser,
  setAccessInfo,
  setCurrentUserProfile,
  setCurrentWalletIDLocal,
  setDeviceNotiToken,
  setIsAuthenticated,
  setIsFirstLaunch,
  setSecretLocal,
  signUpUser,
  uploadAvatar,
} from '../slices';
import {navigate, replace} from '@/navigation/RootNavigation';
import {showToastMessage} from '@/functions';
import {hideAppLoading, showAppLoading} from '@/features/common/functions';
import {
  ImportWalletApiParams,
  SignUpUserApiParams,
  UploadAvatarApiParams,
  UploadMediaResponse,
} from '../../services/api/types';
import {store} from '@/redux';

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
      yield put(setAccessInfo(dataLogin!.token));
      yield put(setCurrentUserProfile(dataLogin!.user));
      yield put(setIsAuthenticated(true));
      yield put(setIsFirstLaunch(false));
      yield put(setCurrentWalletIDLocal(dataLogin?.wallet.wallet_id!));
      navigate('AppTabScreen');
    } else {
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
      biometricPublicKey: action.payload.biometricPublicKey,
    });

    if (message === 'success') {
      yield put(setAccessInfo(dataSignUp!.token));
      yield put(setCurrentUserProfile(dataSignUp!.user));
      yield put(setIsAuthenticated(true));
      yield put(setIsFirstLaunch(false));
      yield put(
        setCurrentWalletIDLocal(dataSignUp?.walletDefault.wallet.wallet_id!),
      );
      yield put(
        setSecretLocal({
          wallet_id: dataSignUp?.walletDefault.wallet.wallet_id!,
          ...dataSignUp?.walletDefault.walletSecret,
        }),
      );
      action.payload.callback && action.payload.callback();
    }
  } catch (e: any) {
    showToastMessage(e.message);
  } finally {
    hideAppLoading();
  }
}
function* uploadAvatarSaga(
  action: PayloadAction<UploadAvatarApiParams>,
): SagaIterator<any> {
  showAppLoading();
  console.log(action.payload);
  try {
    const {message, data, status, error}: FullResponse<UploadMediaResponse> =
      yield call(authApi.UploadAvatarApiParams, action.payload.params);

    // if (error === '0') {
    console.log('data updated avatar', data);
    yield put(setCurrentUserProfile(data));
    action.payload.callback && action.payload.callback();
    // }
  } catch (e: any) {
    showToastMessage(e.message);
  } finally {
    hideAppLoading();
  }
}
export default function* authSaga() {
  yield takeLatest(loginUser, loginUserSaga);
  yield takeLatest(signUpUser, signUpUserSaga);
  yield takeLatest(uploadAvatar, uploadAvatarSaga);
}
