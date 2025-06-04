import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useStyles from './styles';
import {Image} from '@rneui/themed';

type SettingItemProps = {
  icon: any;
  title?: string;
  onPress?: () => void;
  key: any;
};

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  onPress,
  key,
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      key={key}
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        alignItems: 'center',
      }}>
      <View
        style={[
          {
            elevation: 2,
            height: 48,
            width: 48,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            backgroundColor: '#000',
            padding: 8,
          },
        ]}>
        <Image source={icon} style={{width: 24, height: 24}} />
      </View>
      {title && (
        <Text style={styles.textCap1} numberOfLines={1}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
export default SettingItem;
