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
