import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {Image} from '@rneui/themed';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {useAppSelector} from '@/redux/hooks';
import AppHeader from '@/components/AppHeader';
import {
  IconArrowDown,
  IconBuy,
  IconQR,
  IconReceive,
  IconSend,
  IconSetting,
  IconSwap,
} from '@/assets/icons';
import {IconCopy} from '@/features/auth/assets/icons';
import {ImageAvatar} from '@/features/auth/assets/images';
import {TabView} from '@rneui/base';
import {
  useGetWalletMutation,
  useRegisterTokenNotificationMutation,
} from '../../redux/RTKQuery';
import {CryptoTabItem} from '../../components';
import {showToastMessage} from '@/functions';

interface HomeScreenProps extends MainStackScreenProps<'HomeScreen'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const [registerNotiToken] = useRegisterTokenNotificationMutation();

  const {currentUser, currentWalletID, isAuthenticated, notificationToken} =
    useAppSelector(state => state.authReducer);
  const [getWalletDetail, {data, isSuccess, isLoading}] =
    useGetWalletMutation();
  const [tabIndex, setTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getWalletDetail({wallet_id: currentWalletID}).unwrap();
    setRefreshing(false);
  };

  const handleTabIndex = (newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  console.log(currentWalletID);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('UserLoginScreen');
      showToastMessage('login first');
    } else {
      registerNotiToken({FCMToken: notificationToken});
    }
    getWalletDetail({wallet_id: currentWalletID});
  }, []);

  return (
    <AppWrapper>
      <AppHeader
        style={{paddingHorizontal: 16}}
        leftComponent={
          <TouchableOpacity>
            <Image source={IconSetting} style={styles.iconHeader} />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{flexDirection: 'row', gap: 16}}>
            <TouchableOpacity>
              <Image source={IconCopy} style={styles.iconHeader} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={IconQR} style={styles.iconHeader} />
            </TouchableOpacity>
          </View>
        }
      />

      <TouchableOpacity activeOpacity={0.8} style={styles.userInfo}>
        <Image source={ImageAvatar} style={styles.icon} />
        <Text style={styles.textBody3Regular}>{currentUser.username}</Text>
        <Image source={IconArrowDown} style={styles.icon} />
      </TouchableOpacity>
      <Text
        style={[styles.textHeading1, {textAlign: 'center', marginBottom: 16}]}>
        $0.00
      </Text>
      <View style={{flexDirection: 'row', gap: 32, alignSelf: 'center'}}>
        <ActionItem icon={IconBuy} title="buy" />
        <ActionItem icon={IconSwap} title="swap" />
        <ActionItem
          icon={IconSend}
          title="send"
          onPress={() => {
            navigation.navigate('SendScreen', {listCoin: data?.tokens});
          }}
        />
        <ActionItem icon={IconReceive} title="receive" />
      </View>
      <View style={styles.tabBar}>
        {['Crypto', 'Collectibles'].map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleTabIndex(index)}
            style={tabIndex === index ? styles.underline : null}>
            <Text
              style={[
                styles.textCap1,
                {opacity: tabIndex === index ? 1 : 0.6, lineHeight: 24},
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TabView value={tabIndex} onChange={setTabIndex}>
        <TabView.Item style={{flex: 1}}>
          <CryptoTabItem
            isHomeList
            refreshing={refreshing}
            onRefresh={onRefresh}
            isLoading={isLoading}
            data={data?.tokens}
          />
        </TabView.Item>
        <TabView.Item style={{flex: 1}}>
          <Text style={styles.textCap1}>2</Text>
        </TabView.Item>
      </TabView>
    </AppWrapper>
  );
};

export default HomeScreen;

type ActionItemProps = {
  icon: any;
  title: string;
  onPress?: () => void;
};

export const ActionItem: React.FC<ActionItemProps> = ({
  icon,
  title,
  onPress,
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.backgroundIcon}>
        <Image source={icon} style={styles.icon} />
      </View>
      <Text style={styles.textCap1}>{title}</Text>
    </TouchableOpacity>
  );
};
