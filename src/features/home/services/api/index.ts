import {apiTransaction} from '@/services/api';
import {HOME_API} from '../../constants';
import {
  createTransactionBTCRequest,
  createTransactionEVMRequest,
  TransactionHistory,
} from '../../redux/RTKQuery/types';
import {FullResponse} from '@/redux/RTKQuery/types';
import {getCurrentTransactionRequest} from './types';

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
// export const getCurrentTransaction: (
//   params: getCurrentTransactionRequest,
// ) => Promise<FullResponse<TransactionHistory>> = async params => {
//   return await apiTransaction
//     .post(HOME_API.GET_CURRENT_TRANSACTION, params)
//     .then(res => res.data);
// };
