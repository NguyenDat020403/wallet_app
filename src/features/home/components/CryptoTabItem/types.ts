import {MarketData} from '../../redux/RTKQuery/types';

export const fakeCoins = [
  {
    coinName: 'Bitcoin',
    icon: 'btc',
    currentPrice: '$87,245.80',
    dailyChange: '+0.1',
    marketCap: '$1,731,066,213,042',
    currentBalance: '0.52 BTC',
  },
  {
    coinName: 'Ethereum',
    icon: 'eth',
    currentPrice: '$4,560.90',
    dailyChange: '-1.2',
    marketCap: '$548,032,178,220',
    currentBalance: '3.1 ETH',
  },
  {
    coinName: 'Binance Coin',
    icon: 'bnb',
    currentPrice: '$410.45',
    dailyChange: '+2.4',
    marketCap: '$67,942,110,530',
    currentBalance: '8.5 BNB',
  },
  {
    coinName: 'Solana',
    icon: 'sol',
    currentPrice: '$136.30',
    dailyChange: '+3.9',
    marketCap: '$58,271,920,030',
    currentBalance: '15.2 SOL',
  },
  {
    coinName: 'Cardano',
    icon: 'ada',
    currentPrice: '$1.28',
    dailyChange: '-0.8',
    marketCap: '$45,238,192,110',
    currentBalance: '2,400 ADA',
  },
  {
    coinName: 'XRP',
    icon: 'xrp',
    currentPrice: '$0.64',
    dailyChange: '+1.1',
    marketCap: '$32,942,110,540',
    currentBalance: '5,200 XRP',
  },
  {
    coinName: 'Polkadot',
    icon: 'dot',
    currentPrice: '$8.92',
    dailyChange: '-0.5',
    marketCap: '$17,031,210,220',
    currentBalance: '180 DOT',
  },
  {
    coinName: 'Dogecoin',
    icon: 'doge',
    currentPrice: '$0.23',
    dailyChange: '+4.2',
    marketCap: '$30,872,910,100',
    currentBalance: '12,000 DOGE',
  },
  {
    coinName: 'Avalanche',
    icon: 'avax',
    currentPrice: '$38.45',
    dailyChange: '+5.6',
    marketCap: '$13,782,612,300',
    currentBalance: '25 AVAX',
  },
  {
    coinName: 'Shiba Inu',
    icon: 'shib',
    currentPrice: '$0.000012',
    dailyChange: '-2.0',
    marketCap: '$6,500,892,500',
    currentBalance: '20,000,000 SHIB',
  },
];

export default fakeCoins;
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
  market_data?: MarketData;
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
