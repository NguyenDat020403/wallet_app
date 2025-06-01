declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL_AUTH: string;
    API_URL_WALLET: string;
    API_URL_NETWORK: string;
    API_URL_TOKEN: string;
    API_URL_UPLOAD: string;
    API_URL_POST: string;
    API_URL_TRANSACTION: string;
    API_URL_NOTIFICATION: string;
  }
  export const Config: NativeConfig;
  export default Config;
}
