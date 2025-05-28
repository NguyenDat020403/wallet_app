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
        width: 60,
      }}>
      <View style={[{justifyContent: 'center', alignItems: 'center'}]}>
        <Image source={icon} style={{width: 28, height: 28}} />
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
