import {PayloadAction} from '@reduxjs/toolkit';
import {SagaIterator} from 'redux-saga';
import {call, put, takeLatest} from 'redux-saga/effects';

import {navigate, replace} from '@/navigation/RootNavigation';
import {showToastMessage} from '@/functions';
import {hideAppLoading, showAppLoading} from '@/features/common/functions';
import {FullResponse} from '@/redux/RTKQuery/types';
import {homeApi} from '../../services';
import {TransactionHistory} from '../RTKQuery/types';
import {
  getCurrentTransactionRequest,
  ImportWalletApiParams,
  ImportWalletResponse,
  NewWalletResponse,
  SwapTokenApiParams,
  SwapTokenResponse,
} from '../slices/types';
import {
  createWallet,
  getCurrentTransaction,
  importWallet,
  swapToken,
} from '../slices';
import {
  setCurrentWalletIDLocal,
  setSecretLocal,
} from '@/features/auth/redux/slices';

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

function* createWalletSaga(action: PayloadAction<any>): SagaIterator<any> {
  showAppLoading();
  try {
    const {message, data, status, error}: FullResponse<NewWalletResponse> =
      yield call(homeApi.createWallet);
    if (message === 'success' || error === '0') {
      yield put(
        setSecretLocal({
          wallet_id: data?.wallet.wallet_id!,
          wallets: data?.walletSecret.wallets,
          mnemonic: data?.walletSecret.mnemonic,
        }),
      );
      yield put(setCurrentWalletIDLocal(data?.wallet.wallet_id!));
      navigate('AppTabScreen');
    } else {
      showToastMessage(message);
    }
  } catch (e: any) {
    showToastMessage(e);
  } finally {
    hideAppLoading();
  }
}

function* importWalletSaga(
  action: PayloadAction<ImportWalletApiParams>,
): SagaIterator<any> {
  showAppLoading();
  try {
    const {message, data, status, error}: FullResponse<ImportWalletResponse> =
      yield call(homeApi.importWalletApi, {
        mnemonic: action.payload.mnemonic,
      });

    if (error === '0' || data) {
      yield put(
        setSecretLocal({
          wallet_id: data?.wallet.wallet_id!,
          wallets: data?.walletSecret.wallets,
          mnemonic: data?.walletSecret.mnemonic,
        }),
      );
      yield put(setCurrentWalletIDLocal(data?.wallet.wallet_id!));
      navigate('AppTabScreen');
    }
  } catch (e: any) {
    showToastMessage(e.message);
  } finally {
    hideAppLoading();
  }
}

function* swapTokenSaga(
  action: PayloadAction<SwapTokenApiParams>,
): SagaIterator<any> {
  showAppLoading();
  try {
    const {message, data, status, error}: FullResponse<SwapTokenResponse> =
      yield call(homeApi.swapTokenApi, action.payload);

    if (error === '0' || data) {
      navigate('AppTabScreen');
    }
  } catch (e: any) {
    showToastMessage(e.message);
  } finally {
    hideAppLoading();
  }
}
export default function* homeSaga() {
  yield takeLatest(getCurrentTransaction, getCurrentTransactionSaga);
  yield takeLatest(createWallet, createWalletSaga);
  yield takeLatest(importWallet, importWalletSaga);
  yield takeLatest(swapToken, swapTokenSaga);
}
