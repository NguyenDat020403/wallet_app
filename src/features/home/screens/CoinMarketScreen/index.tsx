import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {AppHeader, AppWrapper} from '@/components';
import {CartesianChart, Area} from 'victory-native';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';

interface CoinMarketScreenProps
  extends MainStackScreenProps<'CoinMarketScreen'> {}

const CoinMarketScreen: React.FC<CoinMarketScreenProps> = () => {
  const styles = useStyles();
  const [data, setData] = useState<{x: number; y: number}[]>([]);
  const countRef = useRef(0);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');

    ws.onmessage = event => {
      try {
        const json = JSON.parse(event.data);
        const price = parseFloat(json.p);
        if (isNaN(price)) return;

        countRef.current += 1;

        setData(prev => {
          const newData = [...prev, {x: countRef.current, y: price}];
          return newData.length > 30 ? newData.slice(-30) : newData;
        });
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    return () => ws.close();
  }, []);

  const stats = [
    {label: '24h Volume', value: '$3.37b'},
    {label: 'Market Cap.', value: '$186.82b'},
    {label: 'Total Supply', value: '120,221.729'},
    {label: 'Circulating Supply', value: '120,221.729'},
  ];

  return (
    <AppWrapper>
      <AppHeader title="Coin Market" />
      <View style={styles.container}>
        <Text style={styles.textBody1Regular}>ETH/USDT Realtime Price</Text>

        <View style={{flex: 1, marginTop: 16}}>
          <CartesianChart data={data} xKey="x" yKeys={['y']}>
            {({points, chartBounds}) => (
              <Area
                points={points.y}
                y0={chartBounds.bottom}
                color="blue"
                animate={{type: 'timing', duration: 500}}
              />
            )}
          </CartesianChart>
        </View>

        <View style={{gap: 6, paddingVertical: 16}}>
          <Text style={[styles.textCap1, {opacity: 0.6}]}>Stats</Text>
          {stats.map((item, index) => (
            <View
              key={index}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.textCap1}>{item.label}</Text>
              <Text style={styles.textCap1}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </AppWrapper>
  );
};

export default CoinMarketScreen;
