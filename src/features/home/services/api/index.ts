import {apiToken, apiTransaction, apiWallet} from '@/services/api';
import {HOME_API} from '../../constants';
import {
  createTransactionBTCRequest,
  createTransactionEVMRequest,
  TransactionHistory,
} from '../../redux/RTKQuery/types';
import {FullResponse} from '@/redux/RTKQuery/types';
import {getCurrentTransactionRequest} from './types';
import {
  ImportWalletApiParams,
  SwapTokenApiParams,
} from '../../redux/slices/types';

//auth
export const sendTransactionBTC = async (
  params: createTransactionBTCRequest,
) => {
  return await apiTransaction
    .post(HOME_API.SEND_TRANSACTION_BTC, params)
    .then(res => res.data);
};
export const sendTransactionEVM = async (
  params: createTransactionEVMRequest,
) => {
  return await apiTransaction
    .post(HOME_API.SEND_TRANSACTION_EVM, params)
    .then(res => res.data);
};
export const getCurrentTransaction = async (
  params: getCurrentTransactionRequest,
) => {
  return await apiTransaction
    .post(HOME_API.GET_CURRENT_TRANSACTION, params)
    .then(res => res.data);
};

//wallet
export const createWallet = async () => {
  return await apiWallet.post(HOME_API.CREATE_WALLET).then(res => res.data);
};

export const importWalletApi = async (params: ImportWalletApiParams) => {
  return await apiWallet
    .post(HOME_API.IMPORT_WALLET, params)
    .then(res => res.data);
};

//token
export const swapTokenApi = async (params: SwapTokenApiParams) => {
  return await apiToken.post(HOME_API.SWAP_TOKEN, params).then(res => res.data);
};
