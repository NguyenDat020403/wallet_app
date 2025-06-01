import {View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {AppHeader, AppWrapper} from '@/components';
import {LineChart} from 'react-native-gifted-charts';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {CartesianChart, Area} from 'victory-native';

interface CoinMarketScreenProps
  extends MainStackScreenProps<'CoinMarketScreen'> {}

const CoinMarketScreen: React.FC<CoinMarketScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const [data, setData] = useState<{x: number; y: number}[]>([]);
  const countRef = useRef(0);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');

    ws.onmessage = event => {
      const json = JSON.parse(event.data);
      const price = parseFloat(json.p);
      countRef.current += 1;

      setData(prev => {
        const newData = [...prev, {x: countRef.current, y: price}];
        return newData.length > 30 ? newData.slice(-30) : newData;
      });
    };

    return () => ws.close();
  }, []);

  return (
    <AppWrapper>
      <AppHeader title="Coin Market" />
      <View style={styles.container}>
        <Text style={styles.textBody1Regular}>ETH/USDT Realtime Price</Text>
        {/* <Text style={styles.textBody1Regular}>
          {price ? price.toFixed(2) : 'Loading...'}
        </Text> */}

        <View style={{flex: 1}}>
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
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 16,
          }}>
          {optionChart.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={
                  isSelected === index
                    ? styles.button
                    : {
                        borderWidth: 1,
                        borderColor: '#272727',
                        padding: 8,
                        alignSelf: 'flex-start',
                      }
                }
                onPress={() => {
                  setIsSelected(index);
                }}>
                <Text
                  style={
                    isSelected === index
                      ? styles.textBody1Regular
                      : [styles.textBody1Regular, {color: '#7B849B'}]
                  }>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View> */}
        <View style={{gap: 6, paddingVertical: 16}}>
          <Text style={[styles.textCap1, {opacity: 0.6}]}>Stats</Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textCap1}>24h volume</Text>
            <Text style={styles.textCap1}>$3.37b</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textCap1}>Market cap.</Text>
            <Text style={styles.textCap1}>$186.82b</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textCap1}>Total supply</Text>
            <Text style={styles.textCap1}>120,221.729</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textCap1}>Circulating supply</Text>
            <Text style={styles.textCap1}>120,221.729</Text>
          </View>
          {/* <View style={{flexDirection: 'row', gap: 8}}>
            <TouchableOpacity style={styles.button}>
              <Text style={[styles.textCap1, {opacity: 0.6}]}>Twitter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={[styles.textCap1, {opacity: 0.6}]}>Website</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={[styles.textCap1, {opacity: 0.6}]}>Reddit</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </AppWrapper>
  );
};

export default CoinMarketScreen;
