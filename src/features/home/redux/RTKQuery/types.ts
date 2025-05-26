export interface WalletResponse {
  wallet_id: string;
  user_id: string;
  wallet_name: string;
  wallet_balance: string;
  wallet_address: string;
  wallet_phrase: any;
}
export interface DetailWalletResponse {
  tokens: Tokens[];
  wallet: WalletResponse;
}
export interface Tokens {
  token: {
    token_id: string;
    token_name: string;
    symbol: string;
    decimals: number;
    thumbnail: any;
    price_feed_id: any;
    percent_change_24h: any;
  };
  network: Network;
  contract_address?: string;
  balance: string;
}
export interface Network {
  network_id: string;
  network_name: string;
  symbol: string;
  thumbnail: string;
  chain_id: string;
  block_explorer_url: string;
  price_feed_id: string;
  is_default_network: boolean;
  is_testnet: boolean;
  rpc_url: string;
  creator_id: any;
}
export interface BTCFee {
  economyFee?: number;
  fastestFee?: number;
  halfHourFee?: number;
  hourFee?: number;
  minimumFee?: number;
}
export interface GasEstimateRequest {
  chain_id: string;
  ownerAddress?: string;
  amount?: number;
}
export interface GasEstimatesResponse extends BTCFee {
  low?: GasOption;
  medium?: GasOption;
  high?: GasOption;
  estimatedBaseFee?: string;
  networkCongestion?: number;
  latestPriorityFeeRange?: [string, string];
  historicalPriorityFeeRange?: [string, string];
  historicalBaseFeeRange?: [string, string];
  priorityFeeTrend?: 'up' | 'down' | 'stable';
  baseFeeTrend?: 'up' | 'down' | 'stable';
  version?: string;
}

export interface GasOption {
  suggestedMaxPriorityFeePerGas?: string;
  suggestedMaxFeePerGas?: string;
  minWaitTimeEstimate?: number;
  maxWaitTimeEstimate?: number;
  totalCost?: string;
}
export interface createTransactionBTCRequest {
  privateKeyWIF: string;
  receiverAddress: string;
  sendAddress: string;
  amount: number;
  feeSelected: number;
}
export interface createTransactionEVMRequest {
  privateKey: string;
  from: string;
  to: string;
  amount: string;
  contract_address?: string;
  rpc_url: string;
  decimals?: number;
  fee: {
    suggestedMaxPriorityFeePerGas: string;
    suggestedMaxFeePerGas: string;
  };
}
export interface getTransactionsHistoryRequest {
  address: string;
  chain_id: string;
  token_id: string;
}
export interface getCurrentTransactionRequest
  extends getTransactionsHistoryRequest {
  tx: string;
  token_id: string;
}
export interface TransactionHistory {
  transaction_hash: string;
  time_transaction: string;
  action_transaction: string;
  from_address: string;
  to_address: string;
  fee_network: string;
  network_name: string;
  block_hash: string;
  block_height: number;
  status?: string;
  gas_limit?: string;
  nonce?: number;
  value?: string;
}
export interface TransactionHistoryByDate {
  [date: string]: TransactionHistory[];
}
