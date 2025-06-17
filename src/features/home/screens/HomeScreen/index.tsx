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
  IconClose,
  IconQR,
  IconReceive,
  IconSend,
  IconSetting,
} from '@/assets/icons';
import {IconCopy} from '@/features/auth/assets/icons';
import {Icon} from '@rneui/base';
import {
  useGetUserWalletsMutation,
  useGetWalletMutation,
  useGetWalletV1Mutation,
  useRegisterTokenNotificationMutation,
} from '../../redux/RTKQuery';
import {CryptoTabItem} from '../../components';
import {requestUserPermission} from '@/functions/notification/functions';
import {StyleProp} from 'react-native';
import {logout, setCurrentWalletIDLocal} from '@/features/auth/redux/slices';
import {setIsChangeWalletName, setUserWallets} from '../../redux/slices';
import {UserWallet} from '../../redux/slices/types';
import {AppBottomSheetModal, AppButton, AppImage} from '@/components';
import Animated from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';

interface HomeScreenProps extends MainStackScreenProps<'HomeScreen'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const dispatch = useAppDispatch();
  const {currentWalletID, currentUser} = useAppSelector(
    state => state.authReducer,
  );
  const {userWallet, isChangeWalletName} = useAppSelector(
    state => state.homeReducer,
  );
  const currentUserWallet = userWallet.find(
    w => w.wallet_id === currentWalletID,
  );
  const [registerNotiToken] = useRegisterTokenNotificationMutation();
  const [getUserWallets, {data: userWallets, isSuccess}] =
    useGetUserWalletsMutation();
  // const [getWalletDetailV1, {data, isLoading}] = useGetWalletMutation();
  const [getWalletDetailV1, {data: dataV1, isLoading}] =
    useGetWalletV1Mutation();
  const [currentWalletInfo, setCurrentWalletInfo] = useState<
    UserWallet | undefined
  >(currentUserWallet && currentUserWallet);
  const [tabIndex, setTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  const onRefresh = async () => {
    setRefreshing(true);
    await getWalletDetailV1({wallet_id: currentWalletID}).unwrap();
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
    if (isChangeWalletName) {
      dispatch(setIsChangeWalletName(false));
    }
  }, [isChangeWalletName]);

  useEffect(() => {
    if (currentWalletID) {
      getWalletDetailV1({wallet_id: currentWalletID});
    }
  }, [currentWalletID]);

  useEffect(() => {
    if (isSuccess) {
      console.log('userWallets:', userWallets, currentUserWallet);

      dispatch(setUserWallets(userWallets));
      setWalletBalance(
        userWallets.reduce(
          (sum, item) => sum + parseFloat(item.wallet_balance),
          0,
        ),
      );
      setCurrentWalletInfo(
        userWallets.find(w => w.wallet_id === currentWalletID),
      );
    }
  }, [userWallets, isSuccess, currentWalletID]);
  return (
    <AppWrapper>
      <AppHeader
        style={{paddingHorizontal: 16}}
        leftComponent={<></>}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MenuScreen');
            }}>
            <Image source={IconSetting} style={styles.iconHeader} />
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <TouchableOpacity
          hitSlop={20}
          onPress={() => {
            setIsVisible(true);
          }}
          style={styles.userInfo}>
          <AppImage
            source={{uri: currentWalletInfo && currentWalletInfo?.thumbnail}}
            style={styles.icon}
          />
          <Text style={styles.textBody3Regular}>
            {currentWalletInfo?.wallet_name}
          </Text>
          <Image source={IconArrowDown} style={styles.icon} />
        </TouchableOpacity>
        <Text
          style={[
            styles.textHeading1,
            {textAlign: 'center', marginBottom: 16},
          ]}>
          {dataV1?.wallet.wallet_balance
            ? Number(dataV1?.wallet.wallet_balance).toFixed(3)
            : 0}{' '}
          $
        </Text>
        <View style={{flexDirection: 'row', gap: 32, alignSelf: 'center'}}>
          <ActionItem
            icon={IconSend}
            title="send"
            onPress={() => {
              navigation.navigate('SendScreen', {
                listCoin: dataV1?.groupedTokens,
              });
            }}
          />
          <ActionItem
            icon={IconReceive}
            title="receive"
            onPress={() => {
              navigation.navigate('ReceiveScreen', {
                tokens: dataV1,
              });
            }}
          />
        </View>
        <CryptoTabItem
          isHomeList
          refreshing={refreshing}
          onRefresh={onRefresh}
          isLoading={isLoading}
          data={dataV1?.groupedTokens}
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
        <AppHeader
          leftComponent={<View />}
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
              }}>
              <AppImage
                source={IconClose}
                style={{width: 24, height: 24}}
                haveDefault={false}
              />
            </TouchableOpacity>
          }
        />
        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.textHeading1}>Wallets Balance</Text>
          <Text style={[styles.textHero, {color: '#b3b3b3'}]}>
            {walletBalance.toFixed(5)}
          </Text>
        </View>
        <Animated.View style={{padding: 16}}>
          <FlatList
            data={userWallet}
            keyExtractor={index => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.walletItem,
                    {
                      backgroundColor:
                        item.wallet_id === currentWalletID ? '#efefef' : '#FFF',
                    },
                  ]}
                  onPress={() => {
                    setCurrentWalletInfo(item);
                    dispatch(setCurrentWalletIDLocal(item.wallet_id));
                    setIsVisible(false);
                  }}>
                  <View style={{flexDirection: 'row', gap: 12}}>
                    <AppImage
                      source={{uri: item.thumbnail}}
                      style={{width: 32, height: 32}}
                    />
                    <Text style={styles.textBody2Medium}>
                      {item.wallet_name}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: 12}}>
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentWalletInfo(item);
                        dispatch(setCurrentWalletIDLocal(item.wallet_id));
                        setIsVisible(false);
                      }}>
                      <Icon
                        type="feather"
                        name="arrow-up-circle"
                        color={'#000'}
                        iconStyle={{fontSize: 16}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('WalletScreen', {
                          wallet: item,
                        });
                        setIsVisible(false);
                      }}>
                      <Icon
                        type="feather"
                        name="more-horizontal"
                        color={'#000'}
                        iconStyle={{fontSize: 16}}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </Animated.View>
        <Animated.View style={styles.addWalletButton}>
          <AppButton
            title="Add Wallet"
            onPress={() => {
              navigation.navigate('AddWalletScreen');
              setIsVisible(false);
            }}
          />
        </Animated.View>
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
