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

type NetworkItemProps = {
  data: NetworkResponse;
};

const NetworkIcon: React.FC<NetworkItemProps> = ({data}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <View style={{flexDirection: 'row', gap: 12}}>
        <AppImage
          style={{width: 40, height: 40, borderRadius: 150}}
          type="AVATAR"
          haveDefault
          resizeMode="stretch"
          source={{uri: data.thumbnail}}
        />
        <View>
          <Text style={styles.textRegular}>{data.network_name}</Text>
          <Text style={styles.textCap} numberOfLines={1}>
            {data.rpc_url}
          </Text>
        </View>
      </View>
      <Icon
        type="feather"
        name="arrow-right"
        color={'#B3B3B3'}
        iconStyle={{fontSize: 16}}
      />
    </TouchableOpacity>
  );
};

export default NetworkIcon;
