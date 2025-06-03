import React, {useEffect} from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppImage, AppListLoading, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {Image} from '@rneui/base';
import {IconDown, IconWarning} from '@/assets/icons';
import {ImageAvatar} from '@/features/auth/assets/images';
import {navigate} from '@/navigation/RootNavigation';
import {Network, Tokens} from './types';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';

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
              <Image source={IconWarning} style={{width: 150, height: 150}} />
              <Text style={styles.textBody3Regular}>No tokens found</Text>
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
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (isHomeList) {
          navigate('CoinDetailScreen', {
            token: data,
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
        <AppImage
          source={{uri: data.token.thumbnail}}
          style={styles.coinIcon}
        />
        <View
          style={{
            width: safeAreaInsets.screenWidth - 32 - 18 - 150,
          }}>
          <Text style={styles.textBody3Regular} numberOfLines={1}>
            {data.token.symbol}
          </Text>
          <View style={{flexDirection: 'row', gap: 12}}>
            <Text
              style={[
                styles.textCap1,
                {
                  color: '#7B849B',
                },
              ]}
              numberOfLines={1}>
              {data.market_data?.price?.toFixed(2) + '$' || 'no data'}
            </Text>
            <Text
              style={[
                styles.textCap1,
                {
                  color:
                    Number(data.market_data?.percent_change_24h) > 0
                      ? '#FFF'
                      : '#BC3C20',
                },
              ]}>
              {data.market_data?.percent_change_24h}%
            </Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.textBody3Regular}>
          {Number(data.balance) === 0 ? 0 : Number(data.balance).toFixed(5)}
        </Text>
        <Text style={[styles.textCap1, {color: '#7B849B'}]}>
          {(
            data.market_data?.price &&
            Number(data.balance) * data.market_data?.price
          )?.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
