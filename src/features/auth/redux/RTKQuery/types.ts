export interface FullResponse<T> {
  message: string;
  data?: T;
  status?: string;
  error?: string;
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
  mnemonic: string;
  walletSecret: WalletSecret[];
}

export interface WalletSecret {
  address: string;
  privateKey: string;
  publickey: string;
}
export interface UserResponse {
  user_id?: string;
  username?: string;
  avatar?: any;
  bio?: any;
  email?: string;
}

export interface WalletDefaultResponse {
  wallet: WalletResponse;
  walletSecret: WalletSecretResponse;
}
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  exp: string;
}

export interface SignUpResponse {
  token: TokenResponse;
  user: UserResponse;
  walletDefault: WalletDefaultResponse;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: TokenResponse;
  user: UserResponse;
  wallet: WalletResponse;
}
