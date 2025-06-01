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
import {RefreshControl} from 'react-native';
import {useGetTokenMarketDataMutation} from '../../redux/RTKQuery';

interface CoinDetailScreenProps
  extends MainStackScreenProps<'CoinDetailScreen'> {}

const CoinDetailScreen: React.FC<CoinDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const data = route.params.token;
  const coinName = data.token.token_name;
  // const optionChart = [
  //   {id: '1', title: '1H'},
  //   {id: '2', title: '1D'},
  //   {id: '3', title: '1W'},
  //   {id: '4', title: '1M'},
  //   {id: '5', title: '1D'},
  //   {id: '6', title: 'All'},
  // ];
  // const lineData = fakeMarketPriceResponse.values.map((item, index) => ({
  //   value: item.y,
  //   label: new Date(item.x * 1000).toLocaleDateString(),
  // }));
  // const [isSelected, setIsSelected] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  useEffect(() => {}, [refreshing]);

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
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.infoCoin}>
          <View style={{gap: 6}}>
            <Text style={[styles.textCap1, {opacity: 0.6}]}>Balance</Text>
            <Text style={styles.textBody3Regular}>
              {Number(data.balance).toFixed(5)}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end', gap: 6}}>
            <Text style={[styles.textCap1, {opacity: 0.6}]}>Value</Text>
            <Text style={styles.textBody3Regular}>
              $
              {(Number(data.market_data?.price) * Number(data.balance)).toFixed(
                2,
              )}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 32, alignSelf: 'center'}}>
          <ActionItem icon={IconBuy} title="buy" />
          <ActionItem icon={IconSwap} title="swap" />
          <ActionItem
            icon={IconSend}
            title="send"
            onPress={() => {
              navigation.navigate('TransactionScreen', {
                token: data,
              });
            }}
          />
          <ActionItem icon={IconReceive} title="receive" />
        </View>

        <Text style={styles.textBody2SemiBold}>History</Text>
        <TransactionHistoryItem data={data} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CoinMarketScreen', {token: data});
        }}
        activeOpacity={0.7}
        style={styles.bottomContainer}>
        <Text style={styles.textBody1RegularBlack}>Current Price ($):</Text>
        <Text style={styles.textBody1RegularBlack}>
          {data.market_data?.price?.toFixed(2)}$
        </Text>
      </TouchableOpacity>
    </AppWrapper>
  );
};

export default CoinDetailScreen;
