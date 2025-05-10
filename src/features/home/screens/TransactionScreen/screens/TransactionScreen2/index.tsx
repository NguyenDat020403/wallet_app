import React from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
type TransactionScreen2Props = {
  address: string;
};

const TransactionScreen2: React.FC<TransactionScreen2Props> = ({address}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.textBody1Regular}>{address}</Text>
    </View>
  );
};

export default TransactionScreen2;
