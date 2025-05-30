export interface NetworkResponse {
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
  created_at: string;
  updated_at: string;
  deleted_at: any;
  creator_id: any;
  isEVM: boolean;
}
export interface CreateNetworkRequest {
  network_name: string;
  rpc_url: string;
  symbol: string;
  block_explorer_url: string;
  chain_id: string;
  wallet_network_address: string;
  is_testnet?: boolean;
}
