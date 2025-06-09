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
  rpc_url?: string;
}

export type UserWallet = WalletResponse;
export interface NewWalletResponse extends WalletDefaultResponse {}
export interface ImportWalletResponse extends WalletDefaultResponse {}
export interface ImportWalletApiParams {
  mnemonic: string;
}
export interface SwapTokenApiParams {
  rpc_url: string;
  privateKey: string;
  tokenIn: string;
  amountInDecimal: string;
  isSwapAtoB: boolean;
}
export interface SwapTokenResponse {
  _type: string;
  blockHash: string;
  blockNumber: number;
  contractAddress: any;
  from: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  logs: Log[];
  logsBloom: string;
  status: number;
  to: string;
}

export interface Log {
  _type: string;
  address: string;
  blockHash: string;
  blockNumber: number;
  data: string;
  index: number;
  transactionHash: string;
  transactionIndex: number;
}
