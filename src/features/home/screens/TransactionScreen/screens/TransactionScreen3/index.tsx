import React from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';

type TransactionScreen3 = {
  amount: string;
};

const TransactionScreen3: React.FC<TransactionScreen3> = ({amount}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.textBody1Regular}>{amount}</Text>
    </View>
  );
};

export default TransactionScreen3;
