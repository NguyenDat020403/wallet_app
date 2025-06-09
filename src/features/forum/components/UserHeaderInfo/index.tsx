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
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {AppImage} from '@/components';
import {convertDate} from './functions';

type UserHeaderInfoProps = {
  name: string;
  avatar: string;
  created_at?: string;
};

const UserHeaderInfo: React.FC<UserHeaderInfoProps> = ({
  name,
  avatar,
  created_at,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);

  return (
    <View style={{flexDirection: 'row', gap: 12}}>
      <AppImage
        source={{uri: avatar}}
        type="AVATAR"
        style={{width: 40, height: 40}}
      />
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.textBody2Medium}>{name}</Text>
        {created_at && (
          <Text style={styles.textCap1}>{convertDate(created_at)}</Text>
        )}
      </View>
    </View>
  );
};

export default UserHeaderInfo;
