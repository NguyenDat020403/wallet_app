import {PayloadAction} from '@reduxjs/toolkit';
import {SagaIterator} from 'redux-saga';
import {call, put, takeLatest} from 'redux-saga/effects';

import {navigate} from '@/navigation/RootNavigation';
import {showToastMessage} from '@/functions';
import {hideAppLoading, showAppLoading} from '@/features/common/functions';
import {FullResponse} from '@/redux/RTKQuery/types';
import {homeApi} from '../../services';
import {TransactionHistory} from '../RTKQuery/types';
import {getCurrentTransactionRequest} from '../slices/types';
import {getCurrentTransaction} from '../slices';

function* getCurrentTransactionSaga(
  action: PayloadAction<getCurrentTransactionRequest>,
): SagaIterator<any> {
  showAppLoading();
  try {
    const {message, data, status, error}: FullResponse<TransactionHistory> =
      yield call(homeApi.getCurrentTransaction, {
        tx: action.payload.tx,
        token_id: action.payload.token_id,
        address: action.payload.address,
        chain_id: action.payload.chain_id,
      });
    if (status === '200' || error === '0') {
      data && action.payload.callBack(data);
    } else {
      showToastMessage(message);
    }
  } catch (e: any) {
    showToastMessage(e);
  } finally {
    hideAppLoading();
  }
}
export default function* homeSaga() {
  yield takeLatest(getCurrentTransaction, getCurrentTransactionSaga);
}
