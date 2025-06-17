import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Image, Text} from '@rneui/themed';
import {AppImage, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {SettingItem} from './components';
import {
  IconGetHelp,
  IconLogout,
  IconManageAddress,
  IconManagePersonal,
  IconPrivacyPolicy,
  IconSettingNetwork,
  IconTermOfService,
  IconUser,
} from '@/assets/icons';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {ImageAvatar} from '@/features/auth/assets/images';
import {logout} from '@/features/auth/redux/slices';

interface MenuScreenProps extends MainStackScreenProps<'MenuScreen'> {}

const MenuScreen: React.FC<MenuScreenProps> = ({navigation, route}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const dispatch = useAppDispatch();
  const {currentUser} = useAppSelector(state => state.authReducer);
  const ListWalletAction = [
    {
      id: 0,
      icon: IconSettingNetwork,
      title: 'Networks',
      onPress: () => {
        navigation.navigate('NetworkScreen');
      },
    },
    {
      id: 1,
      icon: IconManageAddress,
      title: 'Addresses',
    },
  ];
  const ListUserAction = [
    {
      id: 0,
      icon: IconUser,
      title: 'Profile',
      onPress: () => {},
    },
    {
      id: 1,
      icon: IconLogout,
      title: 'Log out',
      onPress: () => {
        dispatch(logout());
        navigation.reset({
          index: 0,
          routes: [{name: 'FirstScreen'}],
        });
      },
    },
  ];
  const ListAppInfoAction = [
    {
      id: 0,
      icon: IconPrivacyPolicy,
      title: 'Privacy Policy',
      onPress: () => {},
    },
    {
      id: 1,
      icon: IconTermOfService,
      title: 'Terms of Service',
      onPress: () => {},
    },
    {
      id: 2,
      icon: IconGetHelp,
      title: 'Get Help',
      onPress: () => {},
    },
  ];
  return (
    <AppWrapper>
      <AppHeader title="Settings" />
      <View style={{paddingHorizontal: 16}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('ProfileScreen', {
              userId: currentUser.user_id,
            });
          }}
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginVertical: 16,
            paddingVertical: 16,
            elevation: 4,
            backgroundColor: '#FFF',
            paddingHorizontal: 16,
            borderRadius: 12,
          }}>
          <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
            <AppImage
              source={
                currentUser.avatar ? {uri: currentUser.avatar} : ImageAvatar
              }
              style={{width: 32, height: 32, borderRadius: 150}}
            />
            <View>
              <Text style={styles.textSemiBold}>{currentUser.username}</Text>
              <Text style={styles.textCap}>
                {currentUser.email ? currentUser.email : 'Email not added yet'}
              </Text>
            </View>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Icon
              type="feather"
              name="chevron-right"
              color={'#000'}
              iconStyle={{fontSize: 16}}
            />
          </View>
        </TouchableOpacity>

        <Text style={[styles.textSemiBold, {paddingVertical: 16}]}>
          Setting
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={[styles.textRegular]}>Manage</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.setting}>
          {ListWalletAction.map(item => {
            return (
              <SettingItem
                onPress={() => {
                  item.onPress && item.onPress();
                }}
                key={item.id}
                icon={item.icon}
                title={item.title}
              />
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={[styles.textRegular]}>Account</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.setting}>
          {ListUserAction.map(item => {
            return (
              <SettingItem
                onPress={() => {
                  item.onPress && item.onPress();
                }}
                key={item.id}
                icon={item.icon}
                title={item.title}
              />
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={[styles.textRegular]}>App Information</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.setting}>
          {ListAppInfoAction.map(item => {
            return (
              <SettingItem
                onPress={() => {
                  item.onPress && item.onPress();
                }}
                key={item.id}
                icon={item.icon}
                title={item.title}
              />
            );
          })}
        </View>
      </View>
    </AppWrapper>
  );
};

export default MenuScreen;
