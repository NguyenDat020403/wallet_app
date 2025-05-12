import React, {useEffect, useState} from 'react';
import {Easing, KeyboardAvoidingView, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppButton, AppHeader, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {
  TransactionScreen1,
  TransactionScreen2,
  TransactionScreen3,
} from './screens';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {TabView} from '@rneui/base';
import {Animated} from 'react-native';

interface TransactionScreenProps
  extends MainStackScreenProps<'TransactionScreen'> {}

const TransactionScreen: React.FC<TransactionScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const [tabIndex, setTabIndex] = useState(0);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const token = route.params.token;
  console.log(token);
  return (
    <AppWrapper>
      <AppHeader title="Transaction" />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'center',
          }}>
          {[0, 1, 2].map(index => (
            <View
              key={index}
              style={[
                styles.tabBar,
                {
                  backgroundColor: tabIndex === index ? '#FFF' : '#333333',
                },
              ]}
            />
          ))}
        </View>

        <TabView
          value={tabIndex}
          onChange={setTabIndex}
          animationType={'timing'}>
          {/* Tab 1  */}
          <TabView.Item style={{flex: 1}}>
            <TransactionScreen1
              setAddress={setAddress}
              setTabIndex={setTabIndex}
              token={token}
            />
          </TabView.Item>
          {/* Tab 2 */}
          <TabView.Item style={{flex: 1}}>
            <TransactionScreen2
              setAmountTotal={setAmount}
              address={address}
              token={token}
              setTabIndex={setTabIndex}
            />
          </TabView.Item>
          {/* Tab 3 */}
          <TabView.Item style={{flex: 1}}>
            <TransactionScreen3 amount={amount} />
          </TabView.Item>
        </TabView>
      </View>
    </AppWrapper>
  );
};

export default TransactionScreen;
