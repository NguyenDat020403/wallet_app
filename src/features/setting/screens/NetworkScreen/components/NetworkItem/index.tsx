import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, Text} from '@rneui/themed';
import {AppImage, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {useAppSelector} from '@/redux/hooks';
import {NetworkResponse} from '@/features/setting/redux/RTKQuery/types';
import {Icon} from '@rneui/base';
import {navigate} from '@/navigation/RootNavigation';

type NetworkItemProps = {
  data: NetworkResponse;
  onPress?: () => void;
};

const NetworkIcon: React.FC<NetworkItemProps> = ({data, onPress}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => {
        onPress
          ? onPress()
          : navigate('AddNetworkScreen', {network: data, isEnableEdit: true});
      }}>
      <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
        <AppImage
          style={{width: 40, height: 40, borderRadius: 150}}
          type="AVATAR"
          haveDefault
          resizeMode="stretch"
          source={{uri: data.thumbnail}}
        />
        <View
          style={{
            width: safeAreaInsets.screenWidth - 32 - 40 - 12 - 40 - 12,
          }}>
          <Text style={styles.textRegular}>{data.network_name}</Text>
          <Text style={styles.textCap}>{data.rpc_url}</Text>
        </View>
      </View>
      <View
        style={{
          width: 40,
          height: '100%',
          justifyContent: 'center',
        }}>
        <Icon
          type="feather"
          name="chevron-right"
          color={'#B3B3B3'}
          iconStyle={{fontSize: 16}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default NetworkIcon;
