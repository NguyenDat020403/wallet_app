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
import {Network, Tokens} from './types';

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
              data={item}
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
  data: Tokens;
  onPress?: (network_id?: string) => void;
  isHomeList?: boolean;
  index: number;
};

const CoinItem: React.FC<CoinItemProps> = ({
  data,
  onPress,
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
            token_id: data.token.token_id || '',
          });
        } else {
          onPress && onPress(data.network?.network_id, index);
        }
      }}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      }}>
      <View style={styles.leftCoinItem}>
        <Image
          source={{uri: data.token.thumbnail}}
          style={styles.coinIcon}
          containerStyle={{alignSelf: 'center', borderRadius: 150}}
        />
        <View>
          <Text style={styles.textBody3Regular}>{data.token.token_name}</Text>
          <View style={{flexDirection: 'row', gap: 12}}>
            <Text style={[styles.textCap1, {color: '#7B849B'}]}>
              {data.token.price_feed_id || 'loading...'}
            </Text>
            <Text
              style={[
                styles.textCap1,
                {
                  color:
                    Number(data.token.percent_change_24h) > 0 &&
                    data.token.percent_change_24h !== undefined
                      ? '#20BCA4'
                      : '#BC3C20',
                },
              ]}>
              {data.token.percent_change_24h}%
            </Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.textBody3Regular}>{data.network?.symbol}</Text>
        <Text style={[styles.textCap1, {color: '#7B849B'}]}>
          {data.balance}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
