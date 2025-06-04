import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {Image} from '@rneui/themed';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import AppHeader from '@/components/AppHeader';
import {
  IconArrowDown,
  IconBuy,
  IconQR,
  IconReceive,
  IconSend,
  IconSetting,
  IconSwap,
  IconWallet,
  IconWalletActive,
  IconWalletItem,
} from '@/assets/icons';
import {IconCopy} from '@/features/auth/assets/icons';
import {ImageAvatar} from '@/features/auth/assets/images';
import {TabView} from '@rneui/base';
import {
  useGetUserWalletsMutation,
  useGetWalletMutation,
  useRegisterTokenNotificationMutation,
} from '../../redux/RTKQuery';
import {CryptoTabItem} from '../../components';
import {requestUserPermission} from '@/functions/notification/functions';
import {StyleProp} from 'react-native';
import {hideAppLoading} from '@/features/common/functions';
import {logout} from '@/features/auth/redux/slices';
import {setUserWallets} from '../../redux/slices';
import {UserWallet} from '../../redux/slices/types';
import {AppBottomSheetModal, AppButton, AppImage} from '@/components';

interface HomeScreenProps extends MainStackScreenProps<'HomeScreen'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const dispatch = useAppDispatch();
  const {currentUser, currentWalletID, secretLocal} = useAppSelector(
    state => state.authReducer,
  );
  const {userWallet} = useAppSelector(state => state.homeReducer);
  const currentUserWallet = userWallet.find(
    w => w.wallet_id === currentWalletID,
  );
  const [registerNotiToken] = useRegisterTokenNotificationMutation();
  const [getUserWallets, {data: userWallets, isSuccess}] =
    useGetUserWalletsMutation();
  const [getWalletDetail, {data, isLoading}] = useGetWalletMutation();
  const [currentWaleltInfo, setCurrentWalletInfo] = useState<
    UserWallet | undefined
  >(currentUserWallet && currentUserWallet);
  const [tabIndex, setTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getWalletDetail({wallet_id: currentWalletID}).unwrap();
    setRefreshing(false);
  };

  const handleTabIndex = (newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const handleCheckPermission = async () => {
    const token = await requestUserPermission();
    if (token) {
      registerNotiToken({FCMToken: token});
    }
  };

  useEffect(() => {
    handleCheckPermission();
    getUserWallets({});
    getWalletDetail({wallet_id: currentWalletID});
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log('userWallets:', userWallets, currentUserWallet);

      dispatch(setUserWallets(userWallets));

      setCurrentWalletInfo(
        userWallets.find(w => w.wallet_id === currentWalletID),
      );
    }
  }, [userWallets, isSuccess]);
  return (
    <AppWrapper>
      <AppHeader
        style={{paddingHorizontal: 16}}
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MenuScreen');
            }}>
            <Image source={IconSetting} style={styles.iconHeader} />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{flexDirection: 'row', gap: 16}}>
            <TouchableOpacity
              onPress={() => {
                dispatch(logout());
                navigation.navigate('LoginScreen');
              }}>
              <AppImage
                source={IconCopy}
                style={[styles.iconHeader]}
                haveDefault={false}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AppImage
                source={IconQR}
                resizeMode="stretch"
                style={styles.iconHeader}
                haveDefault={false}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
          activeOpacity={0.8}
          style={styles.userInfo}>
          <Image
            source={{uri: currentUserWallet && currentUserWallet?.thumbnail}}
            style={styles.icon}
          />
          <Text style={styles.textBody3Regular}>
            {currentWaleltInfo?.wallet_name}
          </Text>
          <Image source={IconArrowDown} style={styles.icon} />
        </TouchableOpacity>
        <Text
          style={[
            styles.textHeading1,
            {textAlign: 'center', marginBottom: 16},
          ]}>
          {data?.wallet.wallet_balance || 0} $
        </Text>
        <View style={{flexDirection: 'row', gap: 32, alignSelf: 'center'}}>
          <ActionItem
            icon={IconSend}
            title="send"
            onPress={() => {
              navigation.navigate('SendScreen', {listCoin: data?.tokens});
            }}
          />
          <ActionItem icon={IconReceive} title="receive" />
        </View>
        <CryptoTabItem
          isHomeList
          refreshing={refreshing}
          onRefresh={onRefresh}
          isLoading={isLoading}
          data={data?.tokens}
        />
        <TouchableOpacity
          style={styles.addTokenComponent}
          onPress={() => {
            navigation.navigate('TokenScreen');
          }}>
          <Image source={IconBuy} style={{width: 20, height: 20}} />
          <Text style={[styles.textBody1Regular, {color: '#FFF'}]}>
            Add Token
          </Text>
        </TouchableOpacity>
      </View>
      <AppBottomSheetModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        snapPoints={['100%']}>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            {userWallet &&
              userWallet.map((item, index) => {
                return (
                  <View style={{flexDirection: 'row', gap: 12}}>
                    <AppImage
                      source={IconWalletActive}
                      style={{width: 32, height: 32}}
                      haveDefault={false}
                    />
                    <Text style={styles.textBody2Medium}>
                      Wallet {index + 1}
                    </Text>
                  </View>
                );
              })}
          </View>
          <AppButton
            title="Add Wallet"
            buttonStyle={{marginBottom: safeAreaInsets.bottom + 16}}
          />
        </View>
      </AppBottomSheetModal>
    </AppWrapper>
  );
};

export default HomeScreen;

type ActionItemProps = {
  icon: any;
  title?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
};

export const ActionItem: React.FC<ActionItemProps> = ({
  icon,
  title,
  onPress,
  style,
  iconStyle,
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.backgroundIcon, style]}>
        <Image source={icon} style={[styles.icon, iconStyle]} />
      </View>
      {title && <Text style={styles.textCap1}>{title}</Text>}
    </TouchableOpacity>
  );
};
