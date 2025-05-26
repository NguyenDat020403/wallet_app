import React, {SetStateAction, useEffect, useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {Tokens, TransactionHistory} from '@/features/home/redux/RTKQuery/types';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {Image} from '@rneui/base';
import {IconCopy} from '@/features/auth/assets/icons';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToastMessage} from '@/functions';

type TransactionScreen4 = {
  token: Tokens;
  data: TransactionHistory;
  amount: string;
};

const TransactionScreen4: React.FC<TransactionScreen4> = ({
  token,
  data,
  amount,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  // console.log(token);
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
      value: data ? data.action_transaction : 'no data',
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
    <ScrollView style={styles.container}>
      <View style={styles.tokenInfo}>
        <Image
          source={{uri: token.token.thumbnail}}
          style={{width: 40, height: 40, borderRadius: 150}}
        />
        <Text style={styles.textHeading2}>-{amount}</Text>

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
                }}>
                <Text style={styles.textBody1Regular}>{item.value}</Text>
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
    </ScrollView>
  );
};

export default TransactionScreen4;
