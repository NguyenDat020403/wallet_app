import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {dataHistoryTransaction} from './types';
import {ActionItem} from '../../screens/HomeScreen';
import {IconReceive, IconSend, IconWarning} from '@/assets/icons';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {
  useGetCurrentTransactionMutation,
  useGetTransactionsHistoryMutation,
} from '../../redux/RTKQuery';
import {Tokens} from '../CryptoTabItem/types';
import {navigate} from '@/navigation/RootNavigation';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {Image} from '@rneui/base';

import io from 'socket.io-client';
import {
  TransactionHistory,
  TransactionHistoryByDate,
} from '../../redux/RTKQuery/types';
import {showToastMessage} from '@/functions';
import {
  setCurrentTransactionHash,
  setDetailCurrentTransaction,
} from '../../redux/slices';
import {AppImage} from '@/components';
import {ScrollView} from 'react-native';

const SOCKET_URL = 'ws://10.0.2.2:3333';

type TransactionHistoryItemProps = {
  data: Tokens;
};

const TransactionHistoryItem: React.FC<TransactionHistoryItemProps> = ({
  data,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const {currentTransactionHash, detailCurrentTransaction} = useAppSelector(
    state => state.homeReducer,
  );
  const {secretLocal, currentWalletID} = useAppSelector(
    state => state.authReducer,
  );
  const walletSecret = secretLocal.find(w => w.wallet_id === currentWalletID);

  const [getTransactionHistory, {data: dataTransaction, isSuccess, isLoading}] =
    useGetTransactionsHistoryMutation();
  const [
    getCurrentTransaction,
    {data: dataCurrenT, isSuccess: isSuccessCurrentT},
  ] = useGetCurrentTransactionMutation();

  const checkNetwork = data.network.chain_id === '0' ? 1 : 0;
  const address =
    walletSecret!.wallets && walletSecret!.wallets![checkNetwork].address;

  const [dataListTransaction, setDataListTransaction] =
    useState<TransactionHistoryByDate>();

  const [transactionStatus, setTransactionStatus] = useState('pending');

  useEffect(() => {
    getTransactionHistory({
      address: address,
      chain_id: data.network.chain_id,
      token_id: data.token.token_id,
    });
  }, [data]);

  useEffect(() => {
    if (dataTransaction) {
      setDataListTransaction(dataTransaction);
    }
  }, [dataTransaction]);

  useEffect(() => {
    console.log(currentTransactionHash);
    if (currentTransactionHash) {
      getCurrentTransaction({
        tx: currentTransactionHash,
        chain_id: data.network.chain_id,
        address: address,
        token_id: data.token.token_id,
      });
      dispatch(setCurrentTransactionHash(''));
    }
  }, [currentTransactionHash]);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      setSocketConnected(true);
    });
    socket.on('txStatusEVM', (data: {txHash: string; status: string}) => {
      console.log('Received txStatusEVM:', data);
      setTransactionStatus(data.status);
    });
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (dataCurrenT && dataListTransaction && detailCurrentTransaction) {
      const emptyTransaction = new TransactionHistory();
      dispatch(setDetailCurrentTransaction(emptyTransaction));
      showToastMessage('Transaction success!');
      const date = dataCurrenT.time_transaction;

      setDataListTransaction(prev => {
        // Clone object cũ
        const updated = {...prev};

        // Nếu đã có ngày này => push vào mảng cũ
        if (updated[date]) {
          updated[date] = [dataCurrenT, ...updated[date]];
        } else {
          // Nếu là ngày mới => tạo mảng mới
          updated[date] = [dataCurrenT];
        }
        const sorted = Object.keys(updated)
          .sort((a, b) => {
            const [dayA, monthA, yearA] = a.split('/');
            const [dayB, monthB, yearB] = b.split('/');
            const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
            const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
            return dateB.getTime() - dateA.getTime(); // giảm dần
          })
          .reduce((acc, key) => {
            acc[key] = updated[key];
            return acc;
          }, {} as typeof updated);
        return sorted;
      });
    }
  }, [dataCurrenT]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getTransactionHistory({
      address: address,
      chain_id: data.network.chain_id,
      token_id: data.token.token_id,
    });
    setRefreshing(false);
  };
  console.log(refreshing);
  useEffect(() => {
    console.log(refreshing);
  }, [refreshing]);
  return (
    <ScrollView
      style={styles.wrapper}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{marginBottom: 60}}>
        {detailCurrentTransaction.transaction_hash ? (
          <View
            style={{
              paddingVertical: 8,
              width: safeAreaInsets.screenWidth - 32,
            }}>
            <Text style={styles.textCap1}>Current Transaction</Text>
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                navigate('TransactionHistoryScreen', {
                  token: data,
                  txHash: detailCurrentTransaction.transaction_hash,
                });
              }}>
              <ActionItem
                icon={IconSend}
                style={styles.actionItem}
                iconStyle={{
                  width: 16,
                  height: 16,
                }}
              />

              <View style={styles.content}>
                <View style={styles.leftColumn}>
                  <Text style={styles.textRegular}>{transactionStatus}</Text>
                  <Text style={styles.textRegular} numberOfLines={1}>
                    {detailCurrentTransaction.from_address}
                  </Text>
                </View>
                <View style={styles.rightColumn}>
                  <Text
                    style={[
                      styles.textRegular,
                      {
                        color: '#ff2828',
                      },
                    ]}>
                    - {detailCurrentTransaction.value}
                  </Text>
                  <Text style={[styles.textRegular, {color: '#B0B0B0'}]}>
                    {data.token.symbol}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        {!isLoading ? (
          dataListTransaction && Object.keys(dataListTransaction).length > 0 ? (
            Object.keys(dataListTransaction).map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    paddingVertical: 8,
                    width: safeAreaInsets.screenWidth - 32,
                  }}>
                  <Text style={styles.textCap1}>{item}</Text>
                  {dataListTransaction[item].map(tx => {
                    const icon = Number(tx.action_transaction)
                      ? IconReceive
                      : IconSend;
                    const action = Number(tx.action_transaction)
                      ? 'Receive'
                      : 'Send';
                    return (
                      <TouchableOpacity
                        key={tx.transaction_hash}
                        style={styles.container}
                        onPress={() => {
                          navigate('TransactionHistoryScreen', {
                            token: data,
                            txHash: tx.transaction_hash,
                          });
                          console.log('txHash: ', tx.transaction_hash);
                        }}>
                        <ActionItem
                          icon={icon}
                          style={styles.actionItem}
                          iconStyle={{
                            width: 16,
                            height: 16,
                          }}
                        />

                        <View style={styles.content}>
                          <View style={styles.leftColumn}>
                            <Text style={styles.textRegular}>{action}</Text>
                            <Text style={styles.textRegular} numberOfLines={1}>
                              {tx.from_address}
                            </Text>
                          </View>
                          <View style={styles.rightColumn}>
                            <Text
                              style={[
                                styles.textRegular,
                                {
                                  color: Number(tx.action_transaction)
                                    ? '#000'
                                    : '#ff2828',
                                },
                              ]}>
                              {Number(tx.action_transaction) ? '+' : '-'}
                              {tx.value}
                            </Text>
                            <Text
                              style={[styles.textRegular, {color: '#B0B0B0'}]}>
                              {data.token.symbol}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })
          ) : (
            <View style={styles.noDataFoundContainer}>
              <AppImage
                source={IconWarning}
                style={{width: 150, height: 150}}
                haveDefault={false}
              />
              <Text style={styles.textRegular}>Not found any transaction</Text>
            </View>
          )
        ) : (
          <>
            {[0, 1, 2, 3].map(item => {
              return (
                <View style={{paddingVertical: 8}}>
                  <View style={[styles.noDataView, {height: 24}]} />
                  <View style={styles.container}>
                    <View
                      style={[
                        styles.noDataView,
                        {width: 40, borderRadius: 150},
                      ]}
                    />
                    <View style={styles.content}>
                      <View
                        style={[
                          styles.noDataView,
                          {width: safeAreaInsets.screenWidth - 32 - 40 - 8},
                        ]}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default TransactionHistoryItem;
