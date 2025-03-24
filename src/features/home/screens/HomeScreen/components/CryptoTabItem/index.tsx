import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {Image} from '@rneui/base';
import {IconDown} from '@/assets/icons';
import {ImageAvatar} from '@/features/auth/assets/images';
import {navigate} from '@/navigation/RootNavigation';

type CryptoTabItemProps = {
  data?: any;
};

const CryptoTabItem: React.FC<CryptoTabItemProps> = ({data}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      {!data ? (
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
        <FlatList
          data={data}
          style={{marginBottom: 60}}
          contentContainerStyle={{gap: 16, paddingBottom: 16}}
          renderItem={({item}) => {
            return (
              <CoinItem
                coinName={item.coinName}
                icon={item.icon}
                currentPrice={item.currentPrice}
                dailyChange={item.dailyChange}
                marketCap={item.marketCap}
                currentBalance={item.currentBalance}
              />
            );
          }}
        />
      )}
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
};

const CoinItem: React.FC<CoinItemProps> = ({
  coinName,
  icon,
  currentBalance,
  currentPrice,
  dailyChange,
  marketCap,
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigate('CoinDetailScreen', {coinName: coinName || ''});
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
                {color: dailyChange > 0 ? '#20BCA4' : '#BC3C20'},
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
