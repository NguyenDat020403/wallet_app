import React, {useEffect, useState} from 'react';
import {Easing, KeyboardAvoidingView, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppButton, AppHeader, AppImage, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {
  TransactionScreen1,
  TransactionScreen2,
  TransactionScreen3,
} from './screens';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {TabView} from '@rneui/base';
import {TouchableOpacity} from 'react-native';
import {IconQR} from '@/assets/icons';

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

  return (
    <AppWrapper>
      <AppHeader
        title="Transaction"
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ScanScreen', {
                callBack: data => {
                  setAddress(data);
                },
              });
            }}>
            <AppImage
              source={IconQR}
              resizeMode="stretch"
              style={styles.iconHeader}
              haveDefault={false}
            />
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'center',
          }}>
          {[0, 1, 2, 3].map(index => (
            <View
              key={index}
              style={[
                styles.tabBar,
                {
                  backgroundColor: tabIndex === index ? '#000' : '#00000003',
                },
              ]}
            />
          ))}
        </View>

        <TabView
          value={tabIndex}
          onChange={setTabIndex}
          // disableSwipe={true}
          animationType={'timing'}>
          {/* Tab 1  */}
          <TabView.Item style={{flex: 1}}>
            <TransactionScreen1
              receiveAddress={address}
              setAddress={setAddress}
              setTabIndex={setTabIndex}
              token={token}
            />
          </TabView.Item>
          {/* Tab 2 */}
          <TabView.Item style={{flex: 1}}>
            <TransactionScreen2
              setAmountTotal={setAmount}
              token={token}
              setTabIndex={setTabIndex}
            />
          </TabView.Item>
          {/* Tab 3 */}
          <TabView.Item style={{flex: 1}}>
            <TransactionScreen3
              amount={amount}
              token={token}
              address={address}
            />
          </TabView.Item>
        </TabView>
      </View>
    </AppWrapper>
  );
};

export default TransactionScreen;
