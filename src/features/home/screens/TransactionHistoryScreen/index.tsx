import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {AppHeader, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';

import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {ScrollView} from 'react-native';
import {Image} from '@rneui/base';
import {IconCopy} from '@/features/auth/assets/icons';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToastMessage} from '@/functions';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {getCurrentTransaction} from '../../redux/slices';
import {TransactionHistory} from '../../redux/RTKQuery/types';

interface TransactionHistoryScreenProps
  extends MainStackScreenProps<'TransactionHistoryScreen'> {}

const TransactionHistoryScreen: React.FC<TransactionHistoryScreenProps> = ({
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
  const token = route.params.token;
  const txHash = route.params.txHash;
  const checkNetwork = token.network.chain_id === '0' ? 1 : 0;
  const address = walletSecret!.wallets![checkNetwork].address;

  const [data, setData] = useState<TransactionHistory>();
  useEffect(() => {
    dispatch(
      getCurrentTransaction({
        tx: txHash,
        token_id: token.token.token_id,
        address: address,
        chain_id: token.network.chain_id,
        callBack(t) {
          setData(t);
        },
        rpc_url: token.network.rpc_url,
      }),
    );
  }, []);
  const Transaction = [
    {
      id: 0,
      title: 'From',
      value: data ? data.from_address : 'no data',
      isCopy: true,
    },
    {
      id: 1,
      title: 'To',
      value: data ? data.to_address : 'no data',
      isCopy: true,
    },
    {
      id: 2,
      title: 'Time',
      value: data ? data.time_transaction : 'no data',
    },
    {
      id: 3,
      title: 'Action',
      value: data
        ? Number(data.action_transaction)
          ? 'receive'
          : 'send'
        : 'no data',
    },
    {
      id: 4,
      title: 'Network fee',
      value: data ? data.fee_network : 'no data',
    },
    {
      id: 5,
      title: 'Network',
      value: data ? data.network_name : 'no data',
    },
    {
      id: 6,
      title: 'Block hash',
      value: data && data.block_hash ? data.block_hash : 'no data',
      isCopy: true,
    },
    {
      id: 7,
      title: 'Block number',
      value: data && data.block_height ? data.block_height : 'no data',
    },
  ];
  useEffect(() => {
    console.log('da load');
  }, [data]);
  return (
    <AppWrapper>
      <AppHeader title="Transaction History Detail" />
      <ScrollView style={styles.container}>
        {data ? (
          <>
            <View style={styles.tokenInfo}>
              <Image
                source={{uri: token.token.thumbnail}}
                style={{width: 40, height: 40, borderRadius: 150}}
              />
              <Text style={styles.textHeading2}>-{data?.value}</Text>

              <Text style={[styles.textHeading2, {color: '#B0B0B0'}]}>
                {token.token.token_name}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={{gap: 24, paddingVertical: 32}}>
              {Transaction.map(item => {
                return (
                  <View style={{paddingHorizontal: 16, gap: 8}}>
                    <Text style={[styles.textCap1, {color: '#B0B0B0'}]}>
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={[
                          styles.textBody1Regular,
                          {width: safeAreaInsets.screenWidth - 32 - 40},
                        ]}>
                        {item.value}
                      </Text>
                      {item.isCopy && (
                        <Image
                          source={IconCopy}
                          style={{width: 16, height: 16}}
                          onPress={async () => {
                            await Clipboard.setString(item.value);
                            showToastMessage('Copied');
                          }}
                        />
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        ) : (
          <>
            <View style={styles.tokenInfo}>
              <View
                style={[styles.noDataView, {width: 40, borderRadius: 150}]}
              />
              <View style={styles.noDataView} />
              <View style={styles.noDataView} />
            </View>
            <View style={styles.divider} />
            <View style={{gap: 24, paddingVertical: 32}}>
              {Transaction.map(item => {
                return (
                  <View style={{paddingHorizontal: 16, gap: 8}}>
                    <View style={[styles.noDataView, {height: 24}]} />
                    <View style={[styles.noDataView, {width: '100%'}]} />
                  </View>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </AppWrapper>
  );
};

export default TransactionHistoryScreen;
