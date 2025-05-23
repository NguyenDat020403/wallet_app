import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import useStyles from './styles';
import {dataHistoryTransaction} from './types';
import {ActionItem} from '../../screens/HomeScreen';
import {IconSend} from '@/assets/icons';
import {useAppSelector} from '@/redux/hooks';
import {useGetTransactionHistoryMutation} from '../../redux/RTKQuery';

type TransactionHistoryItemProps = {};

const TransactionHistoryItem: React.FC<TransactionHistoryItemProps> = () => {
  const styles = useStyles();
  const [getTransactionHistory, data] = useGetTransactionHistoryMutation();

  const {secretLocal} = useAppSelector(state => state.authReducer);
  const btcAddress = secretLocal.wallets
    ? secretLocal.wallets[1].address
    : 'no data';
  useEffect(() => {
    getTransactionHistory({
      address: btcAddress,
    });
  }, []);
  return (
    <View>
      <Text style={styles.textBody1Regular}>21/05/2025</Text>
      {dataHistoryTransaction.map(item => {
        const action =
          item.vin[0].prevout.scriptpubkey_address ===
          secretLocal.wallets![1].address
            ? 'send'
            : 'receive';
        return (
          <View style={{flexDirection: 'row'}}>
            <ActionItem icon={IconSend} />
            <View>
              <Text style={styles.textBody1Regular}>{action}</Text>
              <Text style={styles.textBody1Regular}>{action}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default TransactionHistoryItem;
