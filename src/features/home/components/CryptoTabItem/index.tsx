import React, {useEffect} from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppListLoading, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {Image} from '@rneui/base';
import {IconDown} from '@/assets/icons';
import {ImageAvatar} from '@/features/auth/assets/images';
import {navigate} from '@/navigation/RootNavigation';
import {Tokens} from '@/features/home/redux/RTKQuery/types';
import {hideAppLoading, showAppLoading} from '@/features/common/functions';

type CryptoTabItemProps = {
  data?: Tokens[];
  isLoading?: boolean;
  onRefresh?: () => {};
  refreshing?: boolean;
  onPress?: (network_id?: string, index?: number) => void;
  isHomeList?: boolean;
};

const CryptoTabItem: React.FC<CryptoTabItemProps> = ({
  data,
  isLoading,
  onRefresh,
  refreshing,
  onPress,
  isHomeList = false,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data}
        style={{marginBottom: 60}}
        contentContainerStyle={{gap: 16, paddingBottom: 16}}
        ListEmptyComponent={
          isLoading ? (
            <AppListLoading isLoading={isLoading} />
          ) : !data ? (
            <View style={styles.noTokenContainer}>
              <Image source={IconDown} style={{width: 150, height: 150}} />
              <Text style={styles.textBody3Regular}>No tokens found</Text>
              <Text
                style={[
                  styles.textBody2Regular,
                  {opacity: 0.6, textAlign: 'center'},
                ]}>
                Deposit tokens to your address or buy Ethereum to get started
              </Text>
            </View>
          ) : (
            <></>
          )
        }
        renderItem={({item, index}) => {
          return (
            <CoinItem
              isHomeList={isHomeList}
              onPress={onPress}
              coinName={item.token.token_name}
              icon={item.token.symbol}
              currentPrice={item.token.price_feed_id || 'TEST'}
              dailyChange={item.token.percent_change_24h || 100}
              marketCap={item.token.price_feed_id || 'TEST'}
              currentBalance={item.balance}
              network_id={item.network_id}
              index={index}
            />
          );
        }}
      />
    </View>
  );
};

export default CryptoTabItem;

type CoinItemProps = {
  coinName?: string;
  icon?: any;
  currentPrice?: string;
  dailyChange?: string;
  marketCap?: string;
  currentBalance?: string;
  onPress?: (network_id?: string) => void;
  isHomeList?: boolean;
  network_id?: string;
  index: number;
};

const CoinItem: React.FC<CoinItemProps> = ({
  coinName,
  icon,
  currentBalance,
  currentPrice,
  dailyChange,
  marketCap,
  onPress,
  network_id,
  index,
  isHomeList,
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (isHomeList) {
          navigate('CoinDetailScreen', {
            coinName: coinName || '',
          });
        } else {
          console.log(11);
          onPress && onPress(network_id, index);
        }
      }}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      }}>
      <View style={styles.leftCoinItem}>
        <Image
          source={ImageAvatar}
          style={styles.coinIcon}
          containerStyle={{alignSelf: 'center'}}
        />
        <View>
          <Text style={styles.textBody3Regular}>{coinName}</Text>
          <View style={{flexDirection: 'row', gap: 12}}>
            <Text style={[styles.textCap1, {color: '#7B849B'}]}>
              {marketCap}
            </Text>
            <Text
              style={[
                styles.textCap1,
                {
                  color:
                    Number(dailyChange) > 0 && dailyChange !== undefined
                      ? '#20BCA4'
                      : '#BC3C20',
                },
              ]}>
              {dailyChange}%
            </Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.textBody3Regular}>{currentPrice}</Text>
        <Text style={[styles.textCap1, {color: '#7B849B'}]}>
          {currentBalance}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
