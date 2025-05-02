export interface FullResponse<T> {
  message: string;
  data: T;
}
export interface WalletResponse {
  wallet_id: string;
  user_id: string;
  wallet_name: string;
  wallet_balance: string;
  wallet_address: string;
  wallet_phrase: any;
}

export interface WalletSecretResponse {
  private_key: string;
  mnemonic: string;
  address: string;
}

export interface UserResponse {
  user_id?: string;
  username?: string;
  avatar?: any;
  bio?: any;
  email?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  exp: string;
}

export interface SignUpResponse {
  token: TokenResponse;
  user: UserResponse;
  walletSecret: WalletSecretResponse;
}
