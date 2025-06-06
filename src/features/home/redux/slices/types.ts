import {MainStackParamList} from '@/navigation/MainNavigation/types';
import {TransactionHistory, WalletResponse} from '../RTKQuery/types';
import {WalletDefaultResponse} from '@/features/auth/redux/RTKQuery/types';
export type HomeInitialState = {
  userWallet: UserWallet[];
  currentTransactionHash: string;
  detailCurrentTransaction: TransactionHistory;
};

export interface getTransactionsHistoryRequest {}
export interface getCurrentTransactionRequest {
  address: string;
  chain_id: string;
  tx: string;
  token_id: string;
  callBack: (data: TransactionHistory) => void;
}

export type UserWallet = WalletResponse;
export interface NewWalletResponse extends WalletDefaultResponse {}
export interface ImportWalletResponse extends WalletDefaultResponse {}
export interface ImportWalletApiParams {
  mnemonic: string;
}
