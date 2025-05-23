import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {ActionItem} from '../HomeScreen';
import {IconBuy, IconReceive, IconSend, IconSwap} from '@/assets/icons';
import AppHeader from '@/components/AppHeader';
import {Image} from '@rneui/base';
import {ImageAvatar} from '@/features/auth/assets/images';
import {fakeMarketPriceResponse} from './types';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from 'react-native-gifted-charts';
import {ScrollView} from 'react-native';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import WalletScreen from './walletDemo';
import TransactionHistoryItem from '../../components/TransactionHistoryItem';

interface CoinDetailScreenProps
  extends MainStackScreenProps<'CoinDetailScreen'> {}

const CoinDetailScreen: React.FC<CoinDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const coinName = route.params.coinName;
  const optionChart = [
    {id: '1', title: '1H'},
    {id: '2', title: '1D'},
    {id: '3', title: '1W'},
    {id: '4', title: '1M'},
    {id: '5', title: '1D'},
    {id: '6', title: 'All'},
  ];
  const lineData = fakeMarketPriceResponse.values.map((item, index) => ({
    value: item.y,
    label: new Date(item.x * 1000).toLocaleDateString(),
  }));
  const [isSelected, setIsSelected] = useState(0);

  return (
    <AppWrapper>
      <AppHeader
        style={{paddingHorizontal: 16}}
        midComponent={
          <View style={{flexDirection: 'row', gap: 8}}>
            <Image source={ImageAvatar} style={styles.icon} />
            <Text style={styles.textBody3Regular}>{coinName}</Text>
          </View>
        }
      />
      <ScrollView style={styles.container}>
        <View style={styles.infoCoin}>
          <View style={{gap: 6}}>
            <Text style={[styles.textCap1, {opacity: 0.6}]}>Balance</Text>
            <Text style={styles.textBody3Regular}>2.32 ETH</Text>
          </View>
          <View style={{alignItems: 'flex-end', gap: 6}}>
            <Text style={[styles.textCap1, {opacity: 0.6}]}>Value</Text>
            <Text style={styles.textBody3Regular}>$6,911.70</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 32, alignSelf: 'center'}}>
          <ActionItem icon={IconBuy} title="buy" />
          <ActionItem icon={IconSwap} title="swap" />
          <ActionItem icon={IconSend} title="send" />
          <ActionItem icon={IconReceive} title="receive" />
        </View>
        <View style={{paddingVertical: 16, gap: 6}}>
          <Text style={[styles.textCap1, {opacity: 0.6}]}>Price</Text>
          <Text style={styles.textBody3Regular}>$1,555.68</Text>
          <View style={{flexDirection: 'row', gap: 8}}>
            <Text style={[styles.textCap1, {opacity: 0.6}]}>+$5.16</Text>
            <Text style={[styles.textCap1, {opacity: 0.6}]}>(+1.23%)</Text>
          </View>
        </View>
        <View style={{marginHorizontal: -48}}>
          <LineChart
            data={lineData.map((item, index) => ({
              value: item.value,
              label: item.label,
            }))}
            hideDataPoints
            hideRules={true}
            hideAxesAndRules={true}
            initialSpacing={0} // Đưa điểm đầu tiên sát mép trái
            endSpacing={0} // Đưa điểm cuối sát mép phải
            overflowTop={0} // Không chừa khoảng trống phía trên
            overflowBottom={0} // Không chừa khoảng trống phía dưới
            color="#FFFFFF"
            spacing={20}
            width={safeAreaInsets.screenWidth}
            scrollToEnd={true}
            thickness={1}
            curved
            isAnimated
            disableScroll={false}
            pointerConfig={{
              activatePointersInstantlyOnTouch: true,
              showPointerStrip: true,
              hidePointers: true,
              // eslint-disable-next-line react/no-unstable-nested-components
              pointerLabelComponent: (items: any) => (
                <View style={{}}>
                  <Text style={[styles.textCap1, {width: 100}]}>
                    {items[0].label}
                  </Text>
                  <Text style={[styles.textCap1, {width: 100}]}>
                    {items[0].value}
                  </Text>
                </View>
              ), // Hiển thị nhãn pointer
            }}
          />
        </View>
        <View
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
        </View>
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
          <View style={{flexDirection: 'row', gap: 8}}>
            <TouchableOpacity style={styles.button}>
              <Text style={[styles.textCap1, {opacity: 0.6}]}>Twitter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={[styles.textCap1, {opacity: 0.6}]}>Website</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={[styles.textCap1, {opacity: 0.6}]}>Reddit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TransactionHistoryItem />
      </ScrollView>
    </AppWrapper>
  );
};

export default CoinDetailScreen;
