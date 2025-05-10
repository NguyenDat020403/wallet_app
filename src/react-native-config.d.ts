declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL_AUTH: string;
    API_URL_WALLET: string;
  }
  export const Config: NativeConfig;
  export default Config;
}
