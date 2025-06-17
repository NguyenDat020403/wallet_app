import React, {useEffect, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {
  AppBottomSheetModal,
  AppButton,
  AppImage,
  AppWrapper,
} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {ActionItem} from '../HomeScreen';
import {IconReceive, IconSend, IconSwap} from '@/assets/icons';
import AppHeader from '@/components/AppHeader';
import {Icon, Image} from '@rneui/base';
import {ImageAvatar} from '@/features/auth/assets/images';

import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import TransactionHistoryItem from '../../components/TransactionHistoryItem';
import {useGetSwapTokenInfoMutation} from '../../redux/RTKQuery';
import {Token, TokenContract} from '../../redux/RTKQuery/types';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {swapToken} from '../../redux/slices';

interface CoinDetailScreenProps
  extends MainStackScreenProps<'CoinDetailScreen'> {}

const CoinDetailScreen: React.FC<CoinDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const dispatch = useAppDispatch();
  const {secretLocal, currentWalletID} = useAppSelector(
    state => state.authReducer,
  );
  const walletSecret = secretLocal.find(w => w.wallet_id === currentWalletID);
  const data = route.params.token;
  const coinName = data.token.token_name;

  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [valueConvert, setTokenValueConvert] = useState(0);
  const [, setRender] = useState(0);
  const forceUpdate = () => setRender(prev => prev + 1);

  const dataTokenSwap = useRef([
    {
      data: {} as TokenContract,
      token: {} as Token,
    },
    {
      data: {} as TokenContract,
      token: {} as Token,
    },
  ]);

  const [getSwapTokenInfo, {data: swapInfo, isSuccess}] =
    useGetSwapTokenInfoMutation();

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const handleSwapVisible = () => {
    getSwapTokenInfo({
      rpc_url: data.network.rpc_url,
      contract_address: '0xD31AfbF1d2A6D8D745D9E6D3d1C15F1bc5F6624d',
    });
    setIsVisible(true);
  };

  const handleSwapTokens = () => {
    const temp = dataTokenSwap.current[0];
    dataTokenSwap.current[0] = dataTokenSwap.current[1];
    dataTokenSwap.current[1] = temp;
    forceUpdate(); // gọi lại render nếu bạn cần UI cập nhật
  };

  const handleOnSwap = () => {
    setIsVisible(false);
    dispatch(
      swapToken({
        rpc_url: data.network.rpc_url,
        privateKey: walletSecret?.wallets[0].privateKey,
        tokenIn: dataTokenSwap.current[0].data.address,
        amountInDecimal: values,
        isSwapAtoB: dataTokenSwap.current[0].token.token_name === 'TokenA',
      }),
    );
  };

  useEffect(() => {
    if (isSuccess) {
      dataTokenSwap.current = [
        {
          data: swapInfo.data[0],
          token: swapInfo.tokens[0],
        },
        {
          data: swapInfo.data[1],
          token: swapInfo.tokens[1],
        },
      ];
    }
  }, [isSuccess]);

  const {
    control,
    handleSubmit,
    reset,
    formState: {isValid},
  } = useForm<{
    value: string;
  }>({
    mode: 'all',
    defaultValues: {
      value: '',
    },
    // resolver: yupResolver(schemaValidate),
  });
  const rate = useMemo(() => {
    return Number(dataTokenSwap.current?.[0]?.data?.rate) || 0;
  }, [dataTokenSwap.current?.[0]?.data?.rate]);

  const values = useWatch({control, name: 'value'});

  useEffect(() => {
    if (!isVisible) {
      reset({
        value: '',
      });
    }
  }, [isVisible]);

  return (
    <AppWrapper>
      <AppHeader
        style={{paddingHorizontal: 16}}
        midComponent={
          <View style={{flexDirection: 'row', gap: 8}}>
            <AppImage
              source={{uri: data.token.thumbnail}}
              style={styles.icon}
            />
            <Text style={styles.textBody3Regular}>{coinName}</Text>
          </View>
        }
      />
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
            {(
              Number(data.market_data?.price || 0) * Number(data.balance)
            ).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', gap: 32, alignSelf: 'center'}}>
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
        {(data.token.token_name === 'TokenA' ||
          data.token.token_name === 'TokenVND') && (
          <ActionItem
            icon={IconSwap}
            title="swap"
            onPress={() => {
              handleSwapVisible();
            }}
          />
        )}
      </View>
      <Text
        style={[
          styles.textBody2SemiBold,
          {paddingHorizontal: 16, paddingVertical: 16},
        ]}>
        History
      </Text>

      <TransactionHistoryItem data={data} />
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
      <AppBottomSheetModal
        autoSize
        isVisible={isVisible}
        setIsVisible={setIsVisible}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: safeAreaInsets.bottom + 16,
          }}>
          <Text style={[styles.textTitle2Bold, {marginBottom: 32}]}>
            Swap Token
          </Text>
          {dataTokenSwap.current.map((item, index) => {
            return (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 16,
                    }}>
                    <View style={{position: 'relative', width: 40}}>
                      <AppImage
                        source={{uri: item.token.thumbnail}}
                        style={{width: 40, height: 40, borderRadius: 150}}
                      />
                      <View
                        style={{
                          height: 16,
                          width: 16,
                          borderRadius: 150,
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                        }}>
                        <AppImage
                          source={{uri: data.network.thumbnail}}
                          style={{width: 16, height: 16, borderRadius: 150}}
                        />
                      </View>
                    </View>
                    <Text style={styles.textTitle2Bold}>
                      {item.token.symbol}
                    </Text>
                  </View>
                  {index === 0 ? (
                    <View style={{gap: 6, alignItems: 'flex-end'}}>
                      <Controller
                        control={control}
                        name={'value'}
                        render={({
                          field: {onChange, value},
                          fieldState: {error},
                        }) => {
                          return (
                            <BottomSheetTextInput
                              value={value}
                              keyboardType="numeric"
                              onChangeText={onChange}
                              key={'value'}
                              placeholder="0.0"
                              style={[
                                styles.textTitle2Bold,
                                {color: '#B3B3B3', textAlign: 'right'},
                              ]}
                            />
                          );
                        }}
                      />
                      <Text style={styles.textCap1}>
                        {Number(item.data.usd) * Number(values)} $
                      </Text>
                    </View>
                  ) : (
                    <View style={{gap: 6, alignItems: 'flex-end'}}>
                      <Text style={[styles.textTitle2Bold, {color: '#B3B3B3'}]}>
                        {Number(values) * rate}
                      </Text>
                      <Text style={styles.textCap1}>
                        {Number(item.data.usd) *
                          Number(values) *
                          Number(dataTokenSwap.current[1].data.usd)}
                        $
                      </Text>
                    </View>
                  )}
                </View>
                {index === 0 && (
                  <View
                    style={{
                      position: 'relative',
                      paddingVertical: 24,
                      justifyContent: 'center',
                    }}>
                    <View style={styles.divider} />
                    <TouchableOpacity
                      style={styles.swapIcon}
                      onPress={handleSwapTokens}>
                      <Icon
                        type="material"
                        name="swap-vert"
                        color={'#FFF'}
                        iconStyle={{fontSize: 16}}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            );
          })}
          <AppButton
            onPress={handleOnSwap}
            title="Confirm"
            buttonStyle={{marginTop: 24}}
          />
        </View>
      </AppBottomSheetModal>
    </AppWrapper>
  );
};

export default CoinDetailScreen;
