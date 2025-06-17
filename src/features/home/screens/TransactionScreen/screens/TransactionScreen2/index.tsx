import React, {SetStateAction, useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {Tokens} from '@/features/home/redux/RTKQuery/types';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {IconClose, IconDelete, IconTrade} from '@/assets/icons';
import {Image} from '@rneui/base';
import {AppButton} from '@/components';
type TransactionScreen2Props = {
  token: Tokens;
  setTabIndex: React.Dispatch<SetStateAction<number>>;
  setAmountTotal: React.Dispatch<SetStateAction<string>>;
};

const TransactionScreen2: React.FC<TransactionScreen2Props> = ({
  token,
  setTabIndex,
  setAmountTotal,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const [amount, setAmount] = useState('0');
  const [isBalanceAmount, setIsBalanceAmount] = useState(true);

  useEffect(() => {
    const numericAmount = parseFloat(amount);
    if (numericAmount === 0) {
      setIsBalanceAmount(false);
    } else if (numericAmount > parseFloat(token.balance)) {
      setIsBalanceAmount(false);
    } else {
      setIsBalanceAmount(true);
    }
  }, [amount, token.balance]);

  const handlePressNumber = (data: string) => {
    if (data === '#') {
      setAmount('0');
      return;
    }
    if (data === '.') {
      if (amount.includes('.')) {
        return;
      }
      setAmount(amount + '.');
      return;
    }
    if (amount === '0') {
      setAmount(data);
    } else {
      setAmount(amount + data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexGrow: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              styles.textBody1Regular,
              {flexShrink: 1, flex: 1, color: '#000'},
            ]}
            numberOfLines={1}>
            Available:
            {' ' + token.balance} {token.token.symbol}
          </Text>
          <TouchableOpacity
            hitSlop={100}
            onPress={() => {
              setAmount(token.balance);
            }}>
            <Text style={styles.textBody1Medium}>Max</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            numberOfLines={2}
            style={[
              styles.textHeading1,
              {flexShrink: 1, flex: 1, color: '#B0B0B0'},
              {
                color: !isBalanceAmount ? 'red' : '#000',
              },
            ]}>
            {amount}
          </Text>
          <Text style={[styles.textHeading1, {color: '#B0B0B0'}]}>
            {token.token.symbol}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.textBody1Regular}>0 VND </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: '#000',
              padding: 8,
              borderRadius: 150,
            }}>
            <Image source={IconTrade} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '#']}
          numColumns={3}
          contentContainerStyle={{
            marginBottom: 16,
            borderRadius: 16,
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handlePressNumber(item);
                }}
                style={styles.boardNumber}>
                {item === '#' ? (
                  <Image
                    source={IconClose}
                    style={{width: 18, height: undefined, aspectRatio: 1}}
                  />
                ) : (
                  <Text style={[styles.textBody2Medium]}>{item}</Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={
            safeAreaInsets.bottom + safeAreaInsets.top + 16
          }>
          <AppButton
            buttonStyle={{
              marginBottom: 16,
              opacity: !isBalanceAmount ? 0.6 : 1,
            }}
            disable={!isBalanceAmount}
            title="Confirm"
            onPress={() => {
              setAmountTotal(amount);
              setTabIndex(2);
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default TransactionScreen2;
