import {MainStackParamList} from '@/navigation/MainNavigation/types';
import {TransactionHistory} from '../RTKQuery/types';
export type HomeInitialState = {};

export interface getTransactionsHistoryRequest {}
export interface getCurrentTransactionRequest {
  address: string;
  chain_id: string;
  tx: string;
  token_id: string;
  callBack: (data: TransactionHistory) => void;
}
