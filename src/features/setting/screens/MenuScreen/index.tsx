import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Image, Text} from '@rneui/themed';
import {AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {SettingItem} from './components';
import {
  IconManageAddress,
  IconManagePersonal,
  IconSettingNetwork,
} from '@/assets/icons';
import {useAppSelector} from '@/redux/hooks';

interface MenuScreenProps extends MainStackScreenProps<'MenuScreen'> {}

const MenuScreen: React.FC<MenuScreenProps> = ({navigation, route}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const {currentUser} = useAppSelector(state => state.authReducer);
  const ListManageAction = [
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
    {
      id: 2,
      icon: IconManagePersonal,
      title: 'Personal',
    },
  ];
  return (
    <AppWrapper>
      <AppHeader title="Settings" />
      <View style={{paddingHorizontal: 16}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginVertical: 16,
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderRadius: 12,
            borderWidth: 0.5,
            borderColor: '#804FB0',
          }}>
          <View style={{flexDirection: 'row', gap: 12}}>
            <Image
              source={
                currentUser.avatar
                  ? {uri: currentUser.avatar}
                  : IconManagePersonal
              }
              style={{width: 32, height: 32}}
              containerStyle={{alignSelf: 'center'}}
            />
            <View>
              <Text style={styles.textSemiBold}>{currentUser.username}</Text>
              <Text style={styles.textRegular}>{currentUser.email}</Text>
            </View>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Icon type="feather" name="chevron-right" color={'#FFFFFF'} />
          </View>
        </TouchableOpacity>

        <Text style={[styles.textSemiBold, {paddingVertical: 16}]}>
          Setting
        </Text>
        <Text style={[styles.textRegular, {paddingBottom: 12}]}>Manage</Text>
        <View style={styles.setting}>
          {ListManageAction.map(item => {
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
        <Text style={[styles.textRegular, {paddingBottom: 12}]}>App </Text>
        <View style={styles.setting}>
          {ListManageAction.map(item => {
            return (
              <SettingItem key={item.id} icon={item.icon} title={item.title} />
            );
          })}
        </View>
      </View>
    </AppWrapper>
  );
};

export default MenuScreen;
