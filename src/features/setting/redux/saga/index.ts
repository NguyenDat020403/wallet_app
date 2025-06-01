import {PayloadAction} from '@reduxjs/toolkit';
import {SagaIterator} from 'redux-saga';
import {call, put, takeLatest} from 'redux-saga/effects';

import {goBack, navigate} from '@/navigation/RootNavigation';
import {showToastMessage} from '@/functions';
import {hideAppLoading, showAppLoading} from '@/features/common/functions';
import {FullResponse} from '@/redux/RTKQuery/types';
import {
  CreateNetworkRequest,
  CreateTokenRequest,
  NetworkResponse,
} from '../RTKQuery/types';
import {settingApi} from '../../services';
import {createNetwork, createToken} from '../slices';

function* createNetworkSaga(
  action: PayloadAction<CreateNetworkRequest>,
): SagaIterator<any> {
  showAppLoading();
  try {
    const {message, data, status, error}: FullResponse<NetworkResponse> =
      yield call(settingApi.createNetwork, action.payload);
    if (status === '200' && error === '0') {
      showToastMessage(message);
      goBack();
    } else {
      showToastMessage(message);
    }
  } catch (e: any) {
    showToastMessage(e);
  } finally {
    hideAppLoading();
  }
}
function* createTokenSaga(
  action: PayloadAction<CreateTokenRequest>,
): SagaIterator<any> {
  showAppLoading();
  try {
    const {message, data, status, error}: FullResponse<string> = yield call(
      settingApi.createToken,
      action.payload,
    );
    if (status === '200' && error === '0') {
      showToastMessage(message);
      goBack();
    } else {
      showToastMessage(message);
      hideAppLoading();
    }
  } catch (e: any) {
    showToastMessage(e);
  } finally {
    hideAppLoading();
  }
}
export default function* settingSaga() {
  yield takeLatest(createNetwork, createNetworkSaga);
  yield takeLatest(createToken, createTokenSaga);
}
