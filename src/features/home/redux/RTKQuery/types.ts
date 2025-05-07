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
  network_id: string;
  balance: string;
}
