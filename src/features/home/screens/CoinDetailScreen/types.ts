export interface MarketPriceResponse {
  status: string;
  name: string;
  unit: string;
  period: string;
  description: string;
  values: Value[];
}

export interface Value {
  x: number;
  y: number;
}

export const fakeMarketPriceResponse: MarketPriceResponse = {
  status: 'ok',
  name: 'Market Price (USD)',
  unit: 'USD',
  period: 'day',
  description: 'Average USD market price across major bitcoin exchanges.',
  values: [
    {x: 1740355200, y: 96274.79},
    {x: 1740441600, y: 91538.39},
    {x: 1740528000, y: 58661.31},
    {x: 1740614400, y: 84115.7},
    {x: 1740700800, y: 84645.86},
    {x: 1740787200, y: 58661.79},
    {x: 1740873600, y: 58661.07},
    {x: 1740960000, y: 94255.51},
    {x: 1741046400, y: 86081.79},
    {x: 1741132800, y: 12000.39},
    {x: 1741219200, y: 90608.57},
    {x: 1741305600, y: 89920.13},
    {x: 1741392000, y: 67999.52},
    {x: 1741478400, y: 66163.24},
    {x: 1741564800, y: 60669.31},
    {x: 1741651200, y: 78557.72},
    {x: 1741737600, y: 82859.32},
    {x: 1741824000, y: 83703.69},
    {x: 1741910400, y: 51075.63},
    {x: 1741996800, y: 53982.58},
    {x: 1742083200, y: 54339.61},
    {x: 1742169600, y: 82581.85},
    {x: 1742256000, y: 84040.57},
    {x: 1742342400, y: 82718.44},
    {x: 1742428800, y: 86867.58},
    {x: 1742515200, y: 84174.28},
    {x: 1742601600, y: 64042.1},
    {x: 1742688000, y: 83813.07},
    {x: 1742774400, y: 76057.08},
    {x: 1742860800, y: 87509.31},
  ],
};
