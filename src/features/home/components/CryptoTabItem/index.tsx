import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppImage, AppListLoading, AppTextInput} from '@/components';
import useStyles from './styles';
import {Image} from '@rneui/base';
import {IconFind, IconWarning} from '@/assets/icons';
import {navigate} from '@/navigation/RootNavigation';
import {Tokens} from './types';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {GroupedTokens} from '../../redux/RTKQuery/types';
import {ScrollView} from 'react-native';
import {useForm, useWatch} from 'react-hook-form';

type CryptoTabItemProps = {
  data?: GroupedTokens;
  isLoading?: boolean;
  onRefresh?: () => {};
  refreshing?: boolean;
  onPress?: (network_id?: string, index?: number) => void;
  isHomeList?: boolean;
  selectedNetwork?: string;
  setSelectedNetwork?: (name: string) => void;
  isSearch?: boolean;
};

const CryptoTabItem: React.FC<CryptoTabItemProps> = ({
  data,
  isLoading,
  onRefresh,
  refreshing,
  onPress,
  isHomeList = false,
  selectedNetwork,
  setSelectedNetwork,
  isSearch,
}) => {
  const styles = useStyles();
  const networkNames = Object.keys(data || {});
  const [internalNetwork, setInternalNetwork] = useState(networkNames[0]);
  const currentNetwork = selectedNetwork ? selectedNetwork : internalNetwork;
  const handleSetNetwork = setSelectedNetwork ?? setInternalNetwork;
  const tokens = data?.[currentNetwork]?.tokens || [];

  useEffect(() => {
    if (!internalNetwork && networkNames.length > 0) {
      setInternalNetwork(networkNames[0]);
    }
  }, [networkNames, internalNetwork]);

  const {control} = useForm<{token_symbol: string}>({
    mode: 'all',
    defaultValues: {
      token_symbol: '',
    },
  });

  const token_symbol = useWatch({control, name: 'token_symbol'});

  const filteredTokens = useMemo(() => {
    if (!token_symbol.trim()) {
      return tokens;
    }

    const keyword = token_symbol.toLowerCase();
    return tokens.filter(token =>
      token.token.symbol.toLowerCase().includes(keyword),
    );
  }, [token_symbol, tokens]);

  return (
    <View style={styles.container}>
      {isSearch && tokens.length > 0 && (
        <View style={{paddingTop: 16, paddingHorizontal: 16}}>
          <View style={{position: 'relative'}}>
            <AppTextInput
              key={'token_symbol'}
              type="INPUT"
              placeholder="Search cryptocurrency"
              name="token_symbol"
              style={{paddingLeft: 40}}
              control={control}
            />
            <AppImage
              source={IconFind}
              style={styles.iconFind}
              haveDefault={false}
            />
          </View>
        </View>
      )}

      <View style={{marginVertical: 10}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10, gap: 8}}>
          {networkNames.map(name => (
            <TouchableOpacity
              key={name}
              onPress={() => handleSetNetwork(name)}
              style={{
                backgroundColor:
                  currentNetwork === name ? '#1A1110' : '#efefef',
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
              }}>
              <Text
                style={[
                  styles.textBody1Regular,
                  {
                    color: currentNetwork === name ? '#FFF' : '#333',
                  },
                ]}>
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={filteredTokens}
        style={{marginBottom: 60}}
        contentContainerStyle={{gap: 16, paddingBottom: 16}}
        ListEmptyComponent={
          isLoading ? (
            <AppListLoading isLoading={isLoading} />
          ) : tokens.length === 0 ? (
            <View style={styles.noTokenContainer}>
              <Image source={IconWarning} style={{width: 150, height: 150}} />
              <Text style={styles.textBody1Regular}>
                Your wallet has no tokens available for sending.
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
  onPress?: (network_id?: string, index?: number) => void;
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
              {data.market_data?.price !== undefined
                ? (data.market_data?.price).toFixed(2) + '$'
                : 0}
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
              {data.market_data?.percent_change_24h
                ? data.market_data?.percent_change_24h
                : 0}
              %
            </Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.textBody3Regular}>
          {Number(data.balance) === 0 ? 0 : Number(data.balance).toFixed(5)}
        </Text>
        <Text style={[styles.textCap1, {color: '#7B849B'}]}>
          {(data.market_data?.price
            ? Number(data.balance) * data.market_data?.price
            : 0
          )?.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
