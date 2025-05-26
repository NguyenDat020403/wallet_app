import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import useStyles from './styles';
import {dataHistoryTransaction} from './types';
import {ActionItem} from '../../screens/HomeScreen';
import {IconReceive, IconSend} from '@/assets/icons';
import {useAppSelector} from '@/redux/hooks';
import {useGetTransactionsHistoryMutation} from '../../redux/RTKQuery';
import {Tokens} from '../CryptoTabItem/types';
import {navigate} from '@/navigation/RootNavigation';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';

type TransactionHistoryItemProps = {
  data: Tokens;
};

const TransactionHistoryItem: React.FC<TransactionHistoryItemProps> = ({
  data,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const [getTransactionHistory, {data: dataTransaction, isSuccess, isLoading}] =
    useGetTransactionsHistoryMutation();

  const {secretLocal} = useAppSelector(state => state.authReducer);
  const checkNetwork = data.network.chain_id === '0' ? 1 : 0;
  const address = secretLocal.wallets![checkNetwork].address;
  useEffect(() => {
    getTransactionHistory({
      address: address,
      chain_id: data.network.chain_id,
      token_id: data.token.token_id,
    });
  }, []);
  useEffect(() => {
    console.log('dataTransaction');
  }, [isSuccess]);

  return (
    <View>
      {!isLoading ? (
        dataTransaction &&
        Object.keys(dataTransaction).map(item => {
          return (
            <View
              style={{
                paddingVertical: 8,
                width: safeAreaInsets.screenWidth - 32,
              }}>
              <Text style={styles.textCap1}>{item}</Text>
              {dataTransaction[item].map(tx => {
                const icon = tx.action_transaction ? IconReceive : IconSend;
                const action = tx.action_transaction ? 'Receive' : 'Send';
                return (
                  <TouchableOpacity
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
                            {color: tx.action_transaction ? '#FFF' : '#ff2828'},
                          ]}>
                          {tx.action_transaction ? '+' : '-'}
                          {tx.value}
                        </Text>
                        <Text style={[styles.textRegular, {color: '#B0B0B0'}]}>
                          {data.token.token_name}
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
        <>
          {[0, 1, 2, 3].map(item => {
            return (
              <View style={{paddingVertical: 8}}>
                <View style={[styles.noDataView, {height: 24}]} />
                <View style={styles.container}>
                  <View
                    style={[styles.noDataView, {width: 40, borderRadius: 150}]}
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
  );
};

export default TransactionHistoryItem;
