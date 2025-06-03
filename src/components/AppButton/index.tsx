import React from 'react';
import {StyleProp, TextProps, TextStyle, ViewStyle} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native';

type AppButtonProps = {
  isOpposite?: boolean;
  title?: string;
  onPress?: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disable?: boolean;
};

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disable,
  isOpposite,
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      activeOpacity={0.6}
      disabled={disable}
      style={[
        styles.button,
        buttonStyle,
        isOpposite && {
          borderColor: '#000',
          borderWidth: 1,
          backgroundColor: '#FFF',
          paddingVertical: 16,
          borderRadius: 12,
        },
      ]}>
      <Text
        style={[styles.textButton, textStyle, isOpposite && {color: '#000'}]}>
        {title && title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;
